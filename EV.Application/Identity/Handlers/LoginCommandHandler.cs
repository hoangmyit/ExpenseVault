using EV.Application.Common.Interfaces;
using EV.Application.Identity.Commands.Login;

namespace EV.Application.Identity.Handlers
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResponse>
    {
        private readonly IAuthService _authService;
        public LoginCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }
        public async Task<LoginResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var token = await _authService.AuthenticateAsync(request.Username, request.Password);
            var refreshToken = await _authService.GenerateRefreshTokenAsync(request.Username);

            return new LoginResponse
            {
                Token = token,
                RefreshToken = refreshToken
            };
        }
    }
}
