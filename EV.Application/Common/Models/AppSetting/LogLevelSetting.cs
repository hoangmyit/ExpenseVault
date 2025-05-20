using Microsoft.Extensions.Configuration;
using System.Text.Json.Serialization;

namespace EV.Application.Common.Models.AppSetting;

public class LogLevelSetting
{
    public required string Default { get; set; }
    [ConfigurationKeyName("Microsoft.AspNetCore")]
    public required string MicrosoftAspNetCore { get; set; }
}