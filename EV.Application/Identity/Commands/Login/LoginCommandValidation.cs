namespace EV.Application.Identity.Commands.Login
{
    public class LoginCommandValidation : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidation()
        {
            RuleFor(x => x.Username)
                .NotEmpty()
                .Length(3, 50)
                .WithMessage(x => x.Username.Length < 3
                    ? "Username must be at least 3 characters"
                    : "Username cannot exceed 50 characters");

            RuleFor(x => x.Password)
                .NotEmpty()
                .Length(8, 50)
                .WithMessage(x => x.Password.Length < 8
                    ? "Password must be at least 8 characters"
                    : "Password cannot exceed 50 characters");
        }
    }
}
