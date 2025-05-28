using EV.Domain.Constants;

namespace EV.Application.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
    {
        public UpdateCategoryCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Id is required.")
                .GreaterThan(1).WithMessage("Id must be greater than 0");
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .NotNull().WithMessage("Name is required.")
                .ForEach(name =>
                {
                    name.Must(n => !string.IsNullOrEmpty(n.Value) && n.Value.Length <= FieldConstrants.Name)
                        .WithMessage($"Name must not be empty and must be less than or equal to {FieldConstrants.Name} characters.");
                });
            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .NotNull().WithMessage("Description is required.")
                 .ForEach(des =>
                 {
                     des.Must(n => !string.IsNullOrEmpty(n.Value) && n.Value.Length <= FieldConstrants.Description)
                         .WithMessage($"Name must not be empty and must be less than or equal to {FieldConstrants.Description} characters.");
                 });
            RuleFor(x => x.Avatar).NotEmpty().WithMessage("Avatar is required.");
            RuleFor(x => x.IsDefault).NotNull().WithMessage("IsDefault is required.");
        }
    }
}
