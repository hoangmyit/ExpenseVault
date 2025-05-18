using EV.Application.Common.Models.AppSetting;
using FluentValidation;

namespace EV.Application.Common.Validators.AppSetting;

public class DevelopmentSettingValidator : AbstractValidator<DevelopmentSetting>
{
    public DevelopmentSettingValidator()
    {
        RuleFor(x => x.ContentSecurityPolicy)
            .NotNull().WithMessage("ContentSecurityPolicy cannot be null.")
            .SetValidator(new ContentSecurityPolicyValidator());
    }
}