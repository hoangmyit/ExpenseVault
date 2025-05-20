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
                ConfirmationLink = "https://localhost:7030/confirm?userId=975da179-8e51-4461-a7ba-0d6a3839caf0&token=CfDJ8ISp4RgKLLVJrNgJkiSdQZTS41yTa/Hjl6Al2zwKBXRLK3LigOQsQVhXSdlxbMqCZ8JiVMsFNhM8HVzcigPa6v7r/ADotYPuIn7E4BjR5CxW/w6mBqR6bFnfyATKQwOfQzOfk8+wjrqpHrJZ05oLZ8SqpR3oYbOxDjjUJTtcRjgs4H8PjnKkG0go7OPuANBHrQz2hlNKHVnSgBiL6N15jvLES5D37sQG51nNY+NvmajfHry+731lSw2jeJPjbiKqeA=="
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
                ConfirmationLink = "https://localhost:7030/confirm?userId=975da179-8e51-4461-a7ba-0d6a3839caf0&token=CfDJ8ISp4RgKLLVJrNgJkiSdQZTS41yTa/Hjl6Al2zwKBXRLK3LigOQsQVhXSdlxbMqCZ8JiVMsFNhM8HVzcigPa6v7r/ADotYPuIn7E4BjR5CxW/w6mBqR6bFnfyATKQwOfQzOfk8+wjrqpHrJZ05oLZ8SqpR3oYbOxDjjUJTtcRjgs4H8PjnKkG0go7OPuANBHrQz2hlNKHVnSgBiL6N15jvLES5D37sQG51nNY+NvmajfHry+731lSw2jeJPjbiKqeA=="
            };
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates/Emails/VerifyEmail.cshtml");

            List<Task> tasks = new List<Task>();
            tasks.Add(
            emailService.SendEmailAsync<VerifyEmailModel>(
                "Hoang My",
                "expense@mailinator.com",
                subject: "Confirm Your Email",
                templatePath: templatePath,
                model
            ));
            tasks.Add(
                emailService.SendEmailAsync<VerifyEmailModel>(
                    "Hoang My",
                    "hoangmyit@outlook.com",
                    subject: "Confirm Your Email",
                    templatePath: templatePath,
                    model
                )
            );

            await Task.WhenAll(tasks);

            return Ok("Email sent successfully!");
        }

    }
}
