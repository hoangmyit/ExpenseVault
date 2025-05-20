using EV.Application.Common.Models.AppSetting;
using FluentValidation;

namespace EV.Application.Common.Validators.AppSetting;

public class ConnectionStringsValidator : AbstractValidator<ConnectionStrings>
{
    public ConnectionStringsValidator()
    {
        RuleFor(x => x.DefaultConnection)
            .NotNull().WithMessage("DefaultConnection cannot be null.")
            .NotEmpty().WithMessage("DefaultConnection cannot be empty.");
    }
}