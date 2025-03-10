namespace EV.Application.Identity.Commands
{
    public class LoginCommand : IRequest<LoginResponse>
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required bool RememberMe { get; set; }
    }

    public class LoginResponse
    {
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
    }
}
