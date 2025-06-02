using EV.Application.Common.Utilities.FluentValidation;
using EV.Application.Common.Validators;

namespace EV.Application.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
    {
        public UpdateCategoryCommandValidator(
            SupportLanguageDescriptionFieldValidator supportLanguageDescriptionFieldValidator,
            SupportLanguageNameFieldValidator supportLanguageNameFieldValidator
            )
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Id is required.")
                .GreaterThan(1).WithMessage("Id must be greater than 0");

            RuleFor(x => x.Name)
                .NotNull().WithMessage("Name is required.");

            RuleForEach(x => x.Name)
                .SetDictionaryItemValidator(supportLanguageNameFieldValidator);

            RuleFor(x => x.Description)
                .NotNull().WithMessage("Description is required.");

            RuleForEach(x => x.Description)
                .SetDictionaryItemValidator(supportLanguageDescriptionFieldValidator);

            RuleFor(x => x.Avatar)
                .MaximumLength(2).WithMessage("Avatar is required.");

            RuleFor(x => x.IsDefault)
                .NotNull().WithMessage("IsDefault is required.");

            RuleFor(x => x.GroupId)
                .NotEmpty().WithMessage("GroupId is required.")
                .LessThanOrEqualTo(1).WithMessage("GroupId must be greater than 0");
        }
    }
}