namespace EV.Application.Identity.Commands.RegisterUser
{
    public class RegisterUserCommand : IRequest<string>
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
