using EV.Domain.Constants;

namespace EV.Application.Common.Validators
{
    public class SupportLanguageNameFieldValidator : AbstractValidator<string>
    {
        public SupportLanguageNameFieldValidator()
        {
            RuleFor(x => x)
                .NotEmpty().WithMessage("Name cannot be empty.")
                .MinimumLength(FieldConstants.NameMax).WithMessage("Name must be less than or equal to 100 characters.")
                .MinimumLength(FieldConstants.NameMin).WithMessage("Name must be at least 2 characters long.");
        }
    }
}
