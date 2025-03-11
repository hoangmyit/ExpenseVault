using EV.Application.Common.Interfaces;
using EV.Application.Identity.Commands.RegisterUser;

namespace EV.Application.Identity.Handlers
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, string>
    {
        private readonly IAuthService _authService;
        public RegisterUserCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }
        public async Task<string> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
