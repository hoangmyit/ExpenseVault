namespace EV.Application.Common.Model;
public class AppSettings
{
    public ConnectionStrings ConnectionStrings { get; set; }
    public Jwt Jwt { get; set; }
    public Logging Logging { get; set; }
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
