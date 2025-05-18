using EV.Application.Common.Models;

namespace EV.Application.Identity.Commands
{
    public class ResendEmailCommand : IRequest<RequestResult>
    {
        public string Email { get; set; }
    }
}
