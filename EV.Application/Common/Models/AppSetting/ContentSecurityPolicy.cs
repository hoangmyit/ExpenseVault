namespace EV.Application.Common.Models.AppSetting;

public record ContentSecurityPolicy
{
    public required string DefaultSrc { get; set; }
    public required string StyleSrc { get; set; }
    public required string ScriptSrc { get; set; }
    public required string ImgSrc { get; set; }
}