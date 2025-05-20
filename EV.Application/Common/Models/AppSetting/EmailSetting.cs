namespace EV.Application.Common.Models.AppSetting;

public record EmailSetting
{
    public required string SmtpServer { get; set; }
    public int Port { get; set; }
    public required string SenderEmail { get; set; }
    public required string SenderName { get; set; }
    public required string Password { get; set; }
}