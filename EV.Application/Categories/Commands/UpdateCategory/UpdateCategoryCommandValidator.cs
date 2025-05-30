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
                .Must(n =>
                {
                    bool isValid = true;
                    foreach(var key in n.Keys)
                    {
                        var value = n[key];
                        if (string.IsNullOrEmpty(value) || value.Length > FieldConstrants.Name)
                        {
                            isValid = false;
                            RuleFor(x => x.Name[key])
                                .NotEmpty().WithName($"name.{key}").WithMessage($"Name for {key} is required.")
                                .MaximumLength(FieldConstrants.Name).WithName($"name.{key}").WithMessage($"Name for {key} must be less than or equal to {FieldConstrants.Name} characters.");
                        }
                    }

                    return false;
                });
            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .NotNull().WithMessage("Description is required.")
                  .Must(n =>
                  {
                      bool isValid = true;
                      foreach (var key in n.Keys)
                      {
                          var value = n[key];
                          if (!string.IsNullOrEmpty(value) && value.Length > FieldConstrants.Name)
                          {
                              isValid = false;
                              RuleFor(x => x.Name[key])
                                  .NotEmpty().WithName($"description.{key}").WithMessage($"Description for {key} is required.")
                                  .MaximumLength(FieldConstrants.Name).WithName($"description.{key}").WithMessage($"Description for {key} must be less than or equal to {FieldConstrants.Name} characters.");
                          }
                      }

                      return isValid;
                  });
            //RuleFor(x => x.Avatar).NotEmpty().WithMessage("Avatar is required.");
            //RuleFor(x => x.IsDefault).NotNull().WithMessage("IsDefault is required.");
            //RuleFor(x => x.GroupId)
            //   .NotEmpty().WithMessage("GroupId is required.")
            //   .GreaterThan(1).WithMessage("GroupId must be greater than 0");
            RuleFor(x => x.Avatar).MaximumLength(2).WithMessage("Avatar is required.");
            RuleFor(x => x.IsDefault).NotNull().WithMessage("IsDefault is required.");
            RuleFor(x => x.GroupId)
               .NotEmpty().WithMessage("GroupId is required.")
               .LessThanOrEqualTo(1).WithMessage("GroupId must be greater than 0");
        }
    }
}
