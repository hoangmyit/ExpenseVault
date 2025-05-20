namespace EV.Application.Common.Models.AppSetting;

public class JwtSetting
{
    public required string PublicFilePath { get; set; }
    public required string PrivateFilePath { get; set; }
    public required string Issuer { get; set; }
    public required string Audience { get; set; }
    public int ExpiryInMinutes { get; set; }
    public int RefreshTokenExpiryInMinutes { get; set; }
}