using EV.Application.Common.Interfaces;
using RazorLight;

namespace EV.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly RazorLightEngine _razorEngine;

        public EmailService()
        {
            _razorEngine = new RazorLightEngineBuilder()
                .UseFileSystemProject(Path.Combine(Directory.GetCurrentDirectory(), "Templates/Emails"))
                .UseMemoryCachingProvider()
                .Build();
        }

        public async Task SendEmailAsync<T>(string to, string subject, string templatePath, T data)
        {
            var body = await _razorEngine.CompileRenderAsync(templatePath, data);

            Console.WriteLine($"Sending email to: {to} with {subject} and body is {body}");
        }
    }
}
