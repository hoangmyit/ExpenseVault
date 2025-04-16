using EV.Application.Identity.Commands.RegisterUser;

namespace EV.Application.Common.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync<T>(string to, string toEmail, string subject, string templatePath, T emailData);
    }
}
