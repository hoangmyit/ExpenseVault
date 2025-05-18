using EV.Application.Common.Models.AppSetting;
using FluentValidation;

namespace EV.Application.Common.Validators.AppSetting;

public class ContentSecurityPolicyValidator : AbstractValidator<ContentSecurityPolicy>
{
    public ContentSecurityPolicyValidator()
    {
        RuleFor(x => x.DefaultSrc)
            .NotNull().WithMessage("DefaultSrc cannot be null.")
            .NotEmpty().WithMessage("DefaultSrc cannot be empty.");
        RuleFor(x => x.StyleSrc)
            .NotNull().WithMessage("StyleSrc cannot be null.")
            .NotEmpty().WithMessage("StyleSrc cannot be empty.");
        RuleFor(x => x.ScriptSrc)
            .NotNull().WithMessage("ScriptSrc cannot be null.")
            .NotEmpty().WithMessage("ScriptSrc cannot be empty.");
        RuleFor(x => x.ImgSrc)
            .NotNull().WithMessage("ImgSrc cannot be null.")
            .NotEmpty().WithMessage("ImgSrc cannot be empty.");
    }
}