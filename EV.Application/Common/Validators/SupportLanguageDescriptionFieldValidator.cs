using EV.Domain.Constants;

namespace EV.Application.Common.Validators
{
    public class SupportLanguageDescriptionFieldValidator : AbstractValidator<string>
    {
        public SupportLanguageDescriptionFieldValidator()
        {
            RuleFor(x => x)
                .MaximumLength(FieldConstants.Description).WithMessage("Description must be less than or equal to 256 characters.")
                .MinimumLength(0).WithMessage("Description must be at least 0 characters long.");
        }
    }
}
