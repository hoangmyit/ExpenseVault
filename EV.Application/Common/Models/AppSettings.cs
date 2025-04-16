namespace EV.Application.Common.Models;
public class AppSettings
{
    public ConnectionStrings ConnectionStrings { get; set; }
    public Jwt Jwt { get; set; }
    public Logging Logging { get; set; }
    public int Port { get; set; }
    public EmailSetting EmailSetting { get; set; }
    public DevelopmentSetting DevelopmentSetting { get; set; }
    public string AppUrl { get; set; }
    public string ServerUrl { get; set; }
}

public class ConnectionStrings
{
    public string DefaultConnection { get; set; }
}

public class Jwt
{
    public string PublicFilePath { get; set; }
    public string PrivateFilePath { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int ExpiryInMinutes { get; set; }
    public int RefreshTokenExpiryInMinutes { get; set; }
}

public class Logging
{
    public LogLevel LogLevel { get; set; }
}

public class LogLevel
{
    public string Default { get; set; }
    public string MicrosoftAspNetCore { get; set; }
}

public record EmailSetting
{
    public string SmtpServer { get; set; }
    public int Port { get; set; }
    public string SenderEmail { get; set; }
    public string SenderName { get; set; }
    public string Password { get; set; }
}

public record DevelopmentSetting
{
    public bool IsDevelopment { get; set; }
    public ContentSecurityPolicy ContentSecurityPolicy { get; set; }
}

public record ContentSecurityPolicy
{
    public string DefaultSrc { get; set; }
    public string StyleSrc { get; set; }
    public string ScriptSrc { get; set; }
    public string ImgSrc { get; set; }
}