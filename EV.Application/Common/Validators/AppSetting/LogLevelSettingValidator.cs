using EV.Application.Common.Models.AppSetting;

namespace EV.Application.Common.Validators.AppSetting;

public class LogLevelSettingValidator : AbstractValidator<LogLevelSetting>
{
    public LogLevelSettingValidator()
    {
        RuleFor(x => x.Default)
            .NotNull().WithMessage("Default cannot be null.")
            .NotEmpty().WithMessage("Default cannot be empty.");
        RuleFor(x => x.MicrosoftAspNetCore)
            .NotNull().WithMessage("MicrosoftAspNetCore cannot be null.")
            .NotEmpty().WithMessage("MicrosoftAspNetCore cannot be empty.");
    }
}