namespace EV.Application.Identity.Commands
{
    public class ConfirmEmailCommand : IRequest<string>
    {
        public required string UserId { get; set; }
        public required string Token { get; set; }
    }
}
