using EV.Application.Common.Interfaces;
using EV.Application.Common.Models;
using EV.Application.Common.Utilities;
using EV.Application.Identity.Commands;
using EV.Application.Identity.Commands.Login;
using EV.Application.Identity.Commands.RegisterUser;
using EV.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace EV.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IAppSettingsService _settingsService;
        private readonly TimeProvider _timeProvider;
        private readonly Jwt _configuration;
        private readonly IDictionary<string, string[]> _signInFailure;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IAppSettingsService settingsService,
            TimeProvider timeProvider)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _settingsService = settingsService;
            _timeProvider = timeProvider;
            _configuration = _settingsService.GetAppSettings().Jwt;
            _signInFailure = new Dictionary<string, string[]>();
            _signInFailure!.Add(nameof(LoginCommand.Username), ["Invalid username or password."]);
            _signInFailure!.Add(nameof(LoginCommand.Password), ["Invalid username or password."]);
        }

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            var user = await _userManager.FindByEmailAsync(username);
            Guard.Against.AgainstValidationException(user == null, _signInFailure);

            var result = await _signInManager.CheckPasswordSignInAsync(user!, password, false);
            Guard.Against.AgainstValidationException(!result.Succeeded, _signInFailure);

            return await GenerateTokenAsync(user!);
        }

        public async Task<string> GenerateRefreshTokenAsync(string username)
        {
            var user = StringUtilities.IsValidEmail(username) ? await _userManager.FindByEmailAsync(username) : await _userManager.FindByNameAsync(username);
            Guard.Against.AgainstValidationException(user == null, _signInFailure);

            return await GenerateRefreshTokenAsync(user!);
        }

        public async Task<RefreshTokenResponse> RefreshTokenAsync(string token, string refreshToken)
        {
            var principal = GetPrincipalFromExpiringToken(token);
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            var user = await _userManager.FindByIdAsync(userId);
            Guard.Against.AgainstUnauthenticated(
                user == null
                || user.RefreshToken != refreshToken
                || user.RefreshTokenExpiryTime < _timeProvider.GetUtcNow()
                , "Invalid refresh token.");

            var newToken = await GenerateTokenAsync(user!);
            var newRefreshToken = await GenerateRefreshTokenAsync(user!);

            return new RefreshTokenResponse()
            {
                RefreshToken = newRefreshToken,
                Token = newToken
            };
        }
        public async Task<string> RegisterUserAsync(string name, string email, string password)
        {
            var normalizedUserName = _userManager.NormalizeName(name);
            Guard.Against.AgainstValidationException(await _userManager.Users
                .AnyAsync(u => u.NormalizedUserName == normalizedUserName), nameof(RegisterUserCommand.Username), "Username already exists.");

            var normalizedEmail = _userManager.NormalizeEmail(email);
            Guard.Against.AgainstValidationException(await _userManager.Users
                .AnyAsync(u => u.NormalizedEmail == normalizedEmail), nameof(RegisterUserCommand.Email), "Email already exists.");

            var result = await _userManager.CreateAsync(new ApplicationUser()
            {
                UserName = name,
                Email = email,
            }, password);

            return result.Succeeded ? $"User {name} created successfully." : $"Failed to create user {name}.";
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

            var userClaim = new ClaimsIdentity();
            userClaim.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            userClaim.AddClaim(new Claim(ClaimTypes.Name, user!.UserName));
            userClaim.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            foreach (var item in userRoles)
            {
                userClaim.AddClaim(new Claim(ClaimTypes.Role, item));
                userClaim.AddClaim(new Claim(ClaimTypes.Role, "User"));
            }

            var claims = new Dictionary<string, object>
            {
                { JwtRegisteredClaimNames.Sub, user.UserName! },
                { JwtRegisteredClaimNames.Iat, GetUnixTimeSeconds(0) },
                { JwtRegisteredClaimNames.Email, user.Email! },
                { JwtRegisteredClaimNames.Exp, GetUnixTimeSeconds(_configuration.ExpiryInMinutes) },
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = userClaim,
                Claims = claims,
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
            var tokenHandler = new JwtSecurityTokenHandler();
            var publicKey = X509CertificateLoader.LoadCertificateFromFile(_configuration.PublicFilePath);
            Guard.Against.Null(publicKey, "Public key is null");

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _configuration.Issuer,
                ValidAudience = _configuration.Audience,
                IssuerSigningKey = new X509SecurityKey(publicKey),
            };
            var principal = tokenHandler.ValidateToken(expiringToken, validationParameters, out var validatedToken);
            var jwtSecurityToken = validatedToken as JwtSecurityToken;
            if (validatedToken == null || !jwtSecurityToken!.Header.Alg.Equals(SecurityAlgorithms.RsaSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }
        private SigningCredentials GetCredentialFormRsaPrivateKey()
        {
            var privateKeyPem = File.ReadAllText(_configuration.PrivateFilePath);
            RSA rsa = RSA.Create();
            rsa.ImportFromPem(privateKeyPem);
            var sercureKey = new RsaSecurityKey(rsa);
            var credentials = new SigningCredentials(sercureKey, SecurityAlgorithms.RsaSha256);
            return credentials;
        }
        #endregion
    }
}
