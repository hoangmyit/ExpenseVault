namespace EV.Application.Identity.Commands.RegisterUser
{
    public class RegisterUserCommandValidation : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserCommandValidation()
        {
            RuleFor(x => x.Username)
            .NotEmpty()
            .Length(3, 50)
            .WithMessage(x => x.Username.Length < 3
                ? "Username must be at least 3 characters"
                : "Username cannot exceed 50 characters")
            .Matches("^[a-zA-Z0-9_]*$")
            .WithMessage("Username must contain only letters, numbers, and underscores");

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Invalid email address");

            RuleFor(x => x.Password)
                .NotEmpty()
                .Length(8, 50)
                .WithMessage(x => x.Password.Length < 8
                    ? "Password must be at least 8 characters"
                    : "Password cannot exceed 50 characters")
                .Matches(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")
                .WithMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*#?&)");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty()
                .Length(8, 50)
                .WithMessage(x => x.ConfirmPassword.Length < 8
                    ? "Password must be at least 8 characters"
                    : "Password cannot exceed 50 characters");

            RuleFor(x => x)
                .Must(x => x.Password == x.ConfirmPassword)
                .WithMessage("Passwords do not match")
                .OverridePropertyName("ConfirmPassword");
        }
    }
}
