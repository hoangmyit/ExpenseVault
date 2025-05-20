using EV.Application.Common.Interfaces;
using EV.Application.Common.Models;
using EV.Application.Common.Models.AppSetting;
using EV.Application.Common.Utilities;
using EV.Application.Emails.Models;
using EV.Application.Identity.Commands;
using EV.Application.Identity.Commands.Login;
using EV.Application.Identity.Commands.RegisterUser;
using EV.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Web;

namespace EV.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IAppSettingsService _settingsService;
        private readonly TimeProvider _timeProvider;
        private readonly JwtSetting _configuration;
        private readonly IDictionary<string, string[]> _signInFailure;
        private readonly IApplicationDbContext _dbContext;
        private readonly IEmailService _emailService;
        private readonly ILogger<AuthService> _logger;
        private readonly AppSettings _appSettings;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IAppSettingsService settingsService,
            TimeProvider timeProvider,
            IApplicationDbContext dbContext,
            IEmailService emailService,
            ILogger<AuthService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _settingsService = settingsService;
            _timeProvider = timeProvider;
            _appSettings = _settingsService.GetAppSettings();
            _configuration = _appSettings.Jwt;
            _signInFailure = new Dictionary<string, string[]>();
            _signInFailure!.Add(nameof(LoginCommand.Username), ["Invalid username or password."]);
            _signInFailure!.Add(nameof(LoginCommand.Password), ["Invalid username or password."]);
            _dbContext = dbContext;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            try
            {
                var normalizedInput = StringUtilities.IsValidEmail(username)
                    ? _userManager.NormalizeEmail(username)
                    : _userManager.NormalizeName(username);

                var user = await _userManager.Users
                    .FirstOrDefaultAsync(u =>
                        u.NormalizedEmail == normalizedInput ||
                        u.NormalizedUserName == normalizedInput);

                if (user == null)
                {
                    _logger.LogWarning("Failed login attempt for user {Username} at {Time}", username, _timeProvider.GetUtcNow());
                }
                Guard.Against.AgainstValidationException(user == null, _signInFailure);

                return await GenerateTokenAsync(user!);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(AuthService)} - Error occurred while authenticating user {username}");
                throw;
            }

        }

        public async Task<string> GenerateRefreshTokenAsync(string username)
        {
            try
            {
                var user = StringUtilities.IsValidEmail(username) ? await _userManager.FindByEmailAsync(username) : await _userManager.FindByNameAsync(username);
                Guard.Against.AgainstValidationException(user == null, _signInFailure);

                return await GenerateRefreshTokenAsync(user!);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(AuthService)} - Error occurred while generating refresh token for user {username}");
                throw;
            }
        }

        public async Task<RefreshTokenResponse> RefreshTokenAsync(string token, string refreshToken)
        {
            try
            {
                var principal = GetPrincipalFromExpiringToken(token);
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    throw new SecurityTokenException("Token is missing user identifier");
                }

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    _logger.LogWarning("Refresh token attempted for non-existent user with ID: {UserId}", userId);
                    throw new SecurityTokenException("Invalid token");
                }

                if (user.RefreshToken != refreshToken)
                {
                    _logger.LogWarning("Invalid refresh token used for user: {UserId}", userId);
                    throw new SecurityTokenException("The refresh token is not valid");
                }

                if (user.RefreshTokenExpiryTime < _timeProvider.GetUtcNow())
                {
                    _logger.LogWarning("Expired refresh token used for user: {UserId}", userId);
                    throw new SecurityTokenException("The refresh token has expired, please log in again");
                }

                var newToken = await GenerateTokenAsync(user);
                var newRefreshToken = await GenerateRefreshTokenAsync(user);

                return new RefreshTokenResponse()
                {
                    RefreshToken = newRefreshToken,
                    Token = newToken
                };
            }
            catch (SecurityTokenException ex)
            {
                _logger.LogWarning(ex, "Token refresh failed: {ErrorMessage}", ex.Message);
                throw; // Let the global exception handler deal with it
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in {MethodName} for token: {TokenPreview}",
                    nameof(RefreshTokenAsync),
                    token?.Length > 10 ? token.Substring(0, 10) + "..." : "null");
                throw;
            }
        }

        public async Task<string> RegisterUserAsync(string name, string email, string password)
        {

            var normalizedUserName = _userManager.NormalizeName(name);
            Guard.Against.AgainstValidationException(await _userManager.Users
                .AnyAsync(u => u.NormalizedUserName == normalizedUserName), nameof(RegisterUserCommand.Username), "Username already exists.");

            var normalizedEmail = _userManager.NormalizeEmail(email);
            Guard.Against.AgainstValidationException(await _userManager.Users
                .AnyAsync(u => u.NormalizedEmail == normalizedEmail), nameof(RegisterUserCommand.Email), "Email already exists.");
            try
            {
                await _dbContext.BeginTransactionAsync();
                var user = new ApplicationUser()
                {
                    Id = Guid.NewGuid(),
                    UserName = name,
                    Email = email,
                };
                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await SendConfirmEmail(user);
                    await _dbContext.CommitTransactionAsync();
                }
                return result.Succeeded ? $"User {name} created successfully." : $"Failed to create user {name}.";
            }
            catch (Exception ex)
            {
                await _dbContext.RollbackTransactionAsync();
                _logger.LogError(ex, "Error in {MethodName} for user: {Name}", nameof(RegisterUserAsync), name);
                throw;
            }
        }

        public async Task<RequestResult> ConfirmEmailAsync(string userId, string token)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user != null && !user.EmailConfirmed)
                {
                    var result = await _userManager.ConfirmEmailAsync(user!, token);
                    if (result.Succeeded)
                    {
                        return new RequestResult(result.Succeeded, "Your email has been confirmed successfully.", "serverResult:auth.email.successConfirmation", null);
                    }
                 }
                return new RequestResult(false, "Your email confirmation failed. Please try again.", "serverResult:auth.email.failureConfirmation", null);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in {MethodName} for userId: {UserId}", nameof(ConfirmEmailAsync), userId);
                throw;
            }
        }


        public async Task<RequestResult> ResendEmailAsync(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null || user.NormalizedEmail != _userManager.NormalizeEmail(email) || user.EmailConfirmed)
                {
                    return new RequestResult(false, "Failed to resend confirmation email. Please try again.", "serverResult:auth.email.failureResend", null);
                }
                try
                {
                    await _dbContext.BeginTransactionAsync();
                    await SendConfirmEmail(user);
                    await _dbContext.CommitTransactionAsync();
                }
                catch (Exception)
                {
                    await _dbContext.RollbackTransactionAsync();
                    throw;
                }
                return new RequestResult(true, "A new confirmation email has been sent to your email address.", "serverResult:auth.email.successResend", null);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in {MethodName} for email: {Email}", nameof(ResendEmailAsync), StringUtilities.MaskEmail(email));
                throw;
            }
        }


        #region Private Methods
        private async Task<string> GenerateRefreshTokenAsync(ApplicationUser user)
        {
            var refreshToken = await _userManager.GenerateUserTokenAsync(user!, "Default", "RefreshToken");
            user!.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = _timeProvider.GetUtcNow().AddMinutes(_configuration.RefreshTokenExpiryInMinutes);

            var result = await _userManager.UpdateAsync(user);
            Guard.Against.AgainstUnauthenticated(!result.Succeeded, "Failed to generate refresh token.");

            return refreshToken;
        }
        private string GetUnixTimeSeconds(int minutes)
        {
            return _timeProvider.GetUtcNow().AddMinutes(minutes).ToUnixTimeSeconds().ToString();
        }
        private async Task<string> GenerateTokenAsync(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var userRoles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, GetUnixTimeSeconds(0), ClaimValueTypes.Integer64),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName!),
            };

            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role)); // Role claims
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = _timeProvider.GetUtcNow().AddMinutes(_configuration.ExpiryInMinutes).UtcDateTime,
                Issuer = _configuration.Issuer,
                Audience = _configuration.Audience,
                SigningCredentials = GetCredentialFormRsaPrivateKey(),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenResult = tokenHandler.WriteToken(token);
            return tokenResult;
        }


        private ClaimsPrincipal GetPrincipalFromExpiringToken(string expiringToken)
        {
            if (string.IsNullOrEmpty(expiringToken))
            {
                throw new SecurityTokenException("Token is empty or null");
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            // Validate token format first
            if (!tokenHandler.CanReadToken(expiringToken))
            {
                throw new SecurityTokenException("Token has an invalid format");
            }

            try
            {
                var publicKey = X509CertificateLoader.LoadCertificateFromFile(_configuration.PublicFilePath);
                Guard.Against.Null(publicKey, "Public key certificate could not be loaded");

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _configuration.Issuer,
                    ValidAudience = _configuration.Audience,
                    IssuerSigningKey = new X509SecurityKey(publicKey),
                    ClockSkew = TimeSpan.Zero  // Optional: for stricter token lifetime validation
                };

                var principal = tokenHandler.ValidateToken(expiringToken, validationParameters, out var validatedToken);

                // Validate the algorithm
                var jwtSecurityToken = validatedToken as JwtSecurityToken;
                if (jwtSecurityToken == null ||
                    !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.RsaSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Token uses an invalid signing algorithm");
                }

                return principal;
            }
            catch (SecurityTokenExpiredException)
            {
                _logger.LogWarning("Token validation failed: Token has expired");
                throw new SecurityTokenException("Your session has expired. Please log in again.");
            }
            catch (SecurityTokenInvalidSignatureException)
            {
                _logger.LogWarning("Token validation failed: Invalid signature");
                throw new SecurityTokenException("The token has an invalid signature.");
            }
            catch (SecurityTokenInvalidIssuerException)
            {
                _logger.LogWarning("Token validation failed: Invalid issuer");
                throw new SecurityTokenException("The token has an invalid issuer.");
            }
            catch (SecurityTokenInvalidAudienceException)
            {
                _logger.LogWarning("Token validation failed: Invalid audience");
                throw new SecurityTokenException("The token has an invalid audience.");
            }
            catch (SecurityTokenValidationException ex)
            {
                _logger.LogWarning(ex, "Token validation failed: General validation error");
                throw new SecurityTokenException("The token is invalid.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected token validation error");
                throw new SecurityTokenException("An error occurred while validating the token.");
            }
        }
        private SigningCredentials GetCredentialFormRsaPrivateKey()
        {
            var privateKeyPem = File.ReadAllText(_configuration.PrivateFilePath);
            RSA rsa = RSA.Create();
            rsa.ImportFromPem(privateKeyPem);
            var secureRsaKey = new RsaSecurityKey(rsa);
            var credentials = new SigningCredentials(secureRsaKey, SecurityAlgorithms.RsaSha256);
            return credentials;
        }
        private string GenerateConfirmLink(string userId, string token)
        {
            var encodedToken = HttpUtility.UrlEncode(token);
            var confirmationLink = $"{_appSettings.AppUrl}/verify-email?userId={userId}&token={encodedToken}";
            return confirmationLink;
        }

        private async Task SendConfirmEmail(ApplicationUser user)
        {
            ArgumentNullException.ThrowIfNull(user);

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var emailConfirmationLink = GenerateConfirmLink(user.Id.ToString(), token);

            var emailData = new VerifyEmailModel()
            {
                ConfirmationLink = emailConfirmationLink,
                Email = user.Email!,
                Username = user.UserName!,
            };

            await _emailService.SendEmailAsync<VerifyEmailModel>(
               user.UserName!,
               user.Email!,
               "Confirm Your Email",
               "Templates/Emails/VerifyEmail.cshtml",
               emailData
            );
        }
        #endregion
    }
}
