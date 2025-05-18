using EV.Application.Common.Models.AppSetting;
using FluentValidation;

namespace EV.Application.Common.Validators.AppSetting;

public class JwtSettingValidator : AbstractValidator<JwtSetting>
{
    public JwtSettingValidator()
    {
        RuleFor(x => x.PublicFilePath)
            .NotNull().WithMessage("PublicFilePath cannot be null.")
            .NotEmpty().WithMessage("PublicFilePath cannot be empty.");
        RuleFor(x => x.PrivateFilePath)
            .NotNull().WithMessage("PrivateFilePath cannot be null.")
            .NotEmpty().WithMessage("PrivateFilePath cannot be empty.");
        RuleFor(x => x.Issuer)
            .NotNull().WithMessage("Issuer cannot be null.")
            .NotEmpty().WithMessage("Issuer cannot be empty.");
        RuleFor(x => x.Audience)
            .NotNull().WithMessage("Audience cannot be null.")
            .NotEmpty().WithMessage("Audience cannot be empty.");
        RuleFor(x => x.ExpiryInMinutes)
            .GreaterThan(0).WithMessage("ExpiryInMinutes must be greater than 0.");
        RuleFor(x => x.RefreshTokenExpiryInMinutes)
            .GreaterThan(0).WithMessage("RefreshTokenExpiryInMinutes must be greater than 0.");
    }
}