namespace EV.Application.Common.Interface
{
    public interface IAuthService
    {
        Task<string> AuthenticateAsync(string username, string password);
        Task<string> GenerateRefreshTokenAsync(string username);
        Task<string> RefreshTokenAsync(string token, string refreshToken);
    }
}
