using EV.Application.Common.Interfaces;
using EV.Application.Common.Models;
using EV.Application.Identity.Commands;
using Microsoft.Extensions.Logging;

namespace EV.Application.Identity.Handlers
{
    public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, RequestResult>
    {
        private readonly ILogger<ConfirmEmailCommandHandler> _logger;
        private readonly IAuthService _authService;

        public ConfirmEmailCommandHandler(ILogger<ConfirmEmailCommandHandler> logger, IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        public async Task<RequestResult> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
        {
            var result = await _authService.ConfirmEmailAsync(request.UserId, request.Token);
            if (result.IsSuccess)
            {
                _logger.LogInformation($"{nameof(ConfirmEmailCommandHandler)} - Email confirmed successfully for user {request.UserId}");
            }
            else
            {
                _logger.LogInformation($"{nameof(ConfirmEmailCommandHandler)} - Email confirmation failed for user  {request.UserId}");
            }
            return result;
        }
    }
}
