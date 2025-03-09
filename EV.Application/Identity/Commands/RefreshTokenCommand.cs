namespace EV.Application.Identity.Commands
{
    public class RefreshTokenCommand : IRequest<RefreshTokenResponse>
    {
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
    }

    public class RefreshTokenResponse
    {
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
    }
}
