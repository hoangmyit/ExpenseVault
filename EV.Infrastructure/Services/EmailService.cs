using EV.Application.Common.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using MimeKit;
using RazorLight;

namespace EV.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly RazorLightEngine _razorEngine;
        private readonly IAppSettingsService _appSettingsService;
        private readonly ILogger<EmailService> _logger;

        public EmailService(
            IAppSettingsService appSettingsService,
            ILogger<EmailService> logger)
        {
            _razorEngine = new RazorLightEngineBuilder()
                .UseFileSystemProject(Path.Combine(Directory.GetCurrentDirectory(), "Templates/Emails"))
                .UseMemoryCachingProvider()
                .Build();
            _appSettingsService = appSettingsService;
            _logger = logger;
        }

        public async Task SendEmailAsync<T>(string to, string toEmail, string subject, string templatePath, T emailData)
        {
            var emailSetting = _appSettingsService.GetAppSettings().EmailSetting;
            var path = Path.Combine(Directory.GetCurrentDirectory(), templatePath);
            var body = await _razorEngine.CompileRenderAsync(path, emailData);

            _logger.LogInformation($"{nameof(EmailService)} - Sending email to: {toEmail} with {subject} and body is {body}");

            var emailMessage = new MimeMessage();
            emailMessage.Sender = new MailboxAddress(emailSetting.SenderName, emailSetting.SenderEmail);
            emailMessage.To.Add(new MailboxAddress(to, toEmail));
            emailMessage.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = body,
                TextBody = "Your email client does not support HTML emails."
            };
            bodyBuilder.HtmlBody = body;
            emailMessage.Body = bodyBuilder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(emailSetting.SmtpServer, emailSetting.Port, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(emailSetting.SenderEmail, emailSetting.Password);
                    await client.SendAsync(emailMessage);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error sending email");
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                }
            }
        }
    }
}
