using EV.Application.Common.Models.AppSetting;
using FluentValidation;

namespace EV.Application.Common.Validators.AppSetting;

public class LoggingSettingValidator : AbstractValidator<LoggingSetting>
{
    public LoggingSettingValidator()
    {
        RuleFor(x => x.LogLevel)
            .NotNull().WithMessage("LogLevel cannot be null.")
            .SetValidator(new LogLevelSettingValidator());
    }
}