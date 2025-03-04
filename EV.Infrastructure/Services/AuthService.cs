using EV.Application.Common.Interface;
using EV.Application.Common.Model;
using EV.Application.Common.Utilities;
using EV.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
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
        }

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            var user = await _userManager.FindByEmailAsync(username);
            Guard.Against.AgainstUnauthenticated(user == null, "Invalid username or password.");

            var result = await _signInManager.CheckPasswordSignInAsync(user!, password, false);
            Guard.Against.AgainstUnauthenticated(!result.Succeeded, "Invalid username or password.");

            return await GenerateTokenAsync(user!);
        }

        public async Task<string> GenerateRefreshTokenAsync(string username)
        {
            var user = await _userManager.FindByEmailAsync(username);
            Guard.Against.AgainstUnauthenticated(user == null, "Invalid username or password");

            var refreshToken = await _userManager.GenerateUserTokenAsync(user!, "Default", "RefreshToken");
            user!.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = _timeProvider.GetUtcNow().AddHours(_configuration.RefreshTokenExpiryInMinutes);

            var result = await _userManager.UpdateAsync(user);
            Guard.Against.AgainstUnauthenticated(!result.Succeeded, "Failed to generate refresh token.");

            return refreshToken;
        }

        public async Task<string> RefreshTokenAsync(string token, string refreshToken)
        {
            var principal = GetPrincipalFromExpiringToken(token);
            var userId = principal.FindFirst(ClaimTypes.Name)?.Value;

            var user = await _userManager.FindByIdAsync(userId);
            Guard.Against.AgainstUnauthenticated(
                user == null 
                || user.RefreshToken != refreshToken 
                || user.RefreshTokenExpiryTime < _timeProvider.GetUtcNow()
                , "Invalid refresh token.");

            return await GenerateTokenAsync(user!);
        }

        #region private methods

        private async Task<string> GenerateTokenAsync(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var userRoles = await _userManager.GetRolesAsync(user);

            var userClaim = new ClaimsIdentity();
            userClaim.AddClaim(new Claim(ClaimTypes.Name, user.Id.ToString()));
            foreach (var item in userRoles)
            {
                userClaim.AddClaim(new Claim(ClaimTypes.Role, item));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = userClaim,
                Expires = _timeProvider.GetUtcNow().AddMinutes(_configuration.ExpiryInMinutes).DateTime,
                Issuer = _configuration.Issuer,
                Audience = _configuration.Audience,
                SigningCredentials = GetCredentialFormRsaPrivateKey()
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
            if (validatedToken == null || jwtSecurityToken!.Header.Alg.Equals(SecurityAlgorithms.RsaSha256, StringComparison.InvariantCultureIgnoreCase))
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
