using EV.Application.Common.Interfaces;
using EV.Application.Common.Models;
using EV.Application.Identity.Commands;
using Microsoft.Extensions.Logging;

namespace EV.Application.Identity.Handlers
{
    public class ResendEmailCommandHandler : IRequestHandler<ResendEmailCommand, RequestResult>
    {
        private readonly ILogger<ResendEmailCommandHandler> _logger;
        private readonly IAuthService _authService;

        public ResendEmailCommandHandler(
            ILogger<ResendEmailCommandHandler> logger, 
            IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        public Task<RequestResult> Handle(ResendEmailCommand request, CancellationToken cancellationToken)
        {
            return _authService.ResendEmailAsync(request.Email);
        }
    }
}
