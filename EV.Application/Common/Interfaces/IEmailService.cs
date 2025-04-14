namespace EV.Application.Common.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync<T>(string to, string subject, string templatePath, T data);
    }
}
