namespace EV.Application.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommandValidation : AbstractValidator<CreateCategoryCommand>
    {
        public CreateCategoryCommandValidation()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(500).WithMessage("Description must not exceed 500 characters.");

            RuleFor(x => x.Avatar)
                .MaximumLength(255).WithMessage("Avatar must not exceed 255 characters.");
        }
    }
}