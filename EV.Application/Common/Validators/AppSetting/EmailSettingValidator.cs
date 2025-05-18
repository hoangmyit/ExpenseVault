using EV.Application.Common.Models.AppSetting;
using FluentValidation;

namespace EV.Application.Common.Validators.AppSetting;

public class EmailSettingValidator : AbstractValidator<EmailSetting>
{
    public EmailSettingValidator()
    {
        RuleFor(x => x.SmtpServer)
            .NotNull().WithMessage("SmtpServer cannot be null.")
            .NotEmpty().WithMessage("SmtpServer cannot be empty.");
        RuleFor(x => x.Port)
            .GreaterThan(0).WithMessage("Port must be greater than 0.");
        RuleFor(x => x.SenderEmail)
            .NotNull().WithMessage("SenderEmail cannot be null.")
            .NotEmpty().WithMessage("SenderEmail cannot be empty.");
        RuleFor(x => x.SenderName)
            .NotNull().WithMessage("SenderName cannot be null.")
            .NotEmpty().WithMessage("SenderName cannot be empty.");
        RuleFor(x => x.Password)
            .NotNull().WithMessage("Password cannot be null.")
            .NotEmpty().WithMessage("Password cannot be empty.");
    }
}