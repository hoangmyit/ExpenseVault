using EV.Application.Common.Interfaces;
using EV.Application.Identity.Commands;

namespace EV.Application.Identity.Handlers
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenResponse>
    {
        private readonly IAuthService _authService;
        public RefreshTokenCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }
        public async Task<RefreshTokenResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            return await _authService.RefreshTokenAsync(request.Token, request.RefreshToken);
        }
    }
}
