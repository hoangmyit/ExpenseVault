using EV.Domain.Constants;

namespace EV.Application.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommandValidation : AbstractValidator<CreateCategoryCommand>
    {
        public CreateCategoryCommandValidation()
        {
            RuleFor(x => x.Name)
                 .NotEmpty().WithMessage("Name is required.")
                 .NotNull().WithMessage("Name is required.")
                 .ForEach(name =>
                 {
                     name.Must(n => !string.IsNullOrEmpty(n.Value) && n.Value.Length <= FieldConstants.NameMax)
                         .WithMessage($"Name must not be empty and must be less than or equal to {FieldConstants.NameMax} characters.");
                 });
            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .NotNull().WithMessage("Description is required.")
                 .ForEach(des =>
                 {
                     des.Must(n => !string.IsNullOrEmpty(n.Value) && n.Value.Length <= FieldConstants.Description)
                         .WithMessage($"Description must not be empty and must be less than or equal to {FieldConstants.Description} characters.");
                 });

            RuleFor(x => x.Avatar)
                .MaximumLength(FieldConstants.Avatar).WithMessage($"Avatar must not exceed {FieldConstants.Avatar} characters.");
        }
    }
}