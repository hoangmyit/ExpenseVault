using EV.Application.Common.Models;

namespace EV.Application.Identity.Commands
{
    public class ConfirmEmailCommand : IRequest<RequestResult>
    {
        public required string UserId { get; set; }
        public required string Token { get; set; }
    }
}
