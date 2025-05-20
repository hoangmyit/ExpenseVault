namespace EV.Application.Emails.Models
{
    public class VerifyEmailModel
    {
        public string Username { get; set; }
        public string ConfirmationLink { get; set; }
        public string Email { get; set; }

    }
}
