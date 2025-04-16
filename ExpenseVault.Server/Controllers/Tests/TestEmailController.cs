using EV.Application.Common.Interfaces;
using EV.Application.Emails.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseVault.Server.Controllers.Tests
{
    public class TestEmailController : Controller
    {
        [Route("test/email")]
        [AllowAnonymous]
        public IActionResult TestEmail()
        {
            var model = new VerifyEmailModel
            {
                Username = "TestUser",
                Email = "ExpampleEmail@test.com",
                ConfirmationLink = "https://example.com/confirm?token=12345"
            };

            return View("~/Templates/Emails/VerifyEmail.cshtml", model);
        }

        [Route("test/send-email")]
        [AllowAnonymous]
        public async Task<IActionResult> TestSendEmail([FromServices] IEmailService emailService)
        {
            var model = new VerifyEmailModel
            {
                Username = "TestUser",
                ConfirmationLink = "https://example.com/confirm?token=12345"
            };
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates/Emails/VerifyEmail.cshtml");

            await emailService.SendEmailAsync<VerifyEmailModel>(
                "Hoang My",
                "expense@mailinator.com",
                subject: "Confirm Your Email",
                templatePath: templatePath,
                model
            );

            return Ok("Email sent successfully!");
        }

    }
}
