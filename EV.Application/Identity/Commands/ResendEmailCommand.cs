namespace EV.Application.Identity.Commands
{
    public class ResendEmailCommand : IRequest<bool>
    {
        public string Email { get; set; }
    }
}
