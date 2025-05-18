namespace EV.Application.Common.Models.AppSetting;

public record DevelopmentSetting
{
    public bool IsDevelopment { get; set; }
    public required ContentSecurityPolicy ContentSecurityPolicy { get; set; }
}