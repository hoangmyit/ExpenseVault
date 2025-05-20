namespace EV.Application.Common.Models.AppSetting;
public class AppSettings
{
    public required ConnectionStrings ConnectionStrings { get; set; }
    public required JwtSetting Jwt { get; set; }
    public required LoggingSetting Logging { get; set; }
    public int Port { get; set; }
    public required EmailSetting EmailSetting { get; set; }
    public required DevelopmentSetting DevelopmentSetting { get; set; }
    public required string AppUrl { get; set; }
    public required string ServerUrl { get; set; }
}