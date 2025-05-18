using EV.Application.Common.Models.AppSetting;
using FluentValidation;

namespace EV.Application.Common.Validators.AppSetting;

public class AppSettingValidator : AbstractValidator<AppSettings>
{
    public AppSettingValidator()
    {
        RuleFor(x => x.ConnectionStrings)
            .NotNull().WithMessage("ConnectionStrings cannot be null.")
            .SetValidator(new ConnectionStringsValidator());
        RuleFor(x => x.Jwt)
            .NotNull().WithMessage("Jwt cannot be null.")
            .SetValidator(new JwtSettingValidator());
        RuleFor(x => x.Logging)
            .NotNull().WithMessage("Logging cannot be null.")
            .SetValidator(new LoggingSettingValidator());
        RuleFor(x => x.EmailSetting)
            .NotNull().WithMessage("EmailSetting cannot be null.")
            .SetValidator(new EmailSettingValidator());
        RuleFor(x => x.DevelopmentSetting)
            .NotNull().WithMessage("DevelopmentSetting cannot be null.")
            .SetValidator(new DevelopmentSettingValidator());
        RuleFor(x => x.AppUrl)
            .NotNull().WithMessage("AppUrl cannot be null.")
            .NotEmpty().WithMessage("AppUrl cannot be empty.");
        RuleFor(x => x.ServerUrl)
            .NotNull().WithMessage("AppUrl cannot be null.")
            .NotEmpty().WithMessage("AppUrl cannot be empty.");
        RuleFor(x => x.Port)
            .GreaterThan(0).WithMessage("Port must be greater than 0.");
    }
}
