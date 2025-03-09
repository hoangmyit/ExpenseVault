using EV.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace EV.Application.Common.Behaviors
{
    public class Loggingbehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
    {
        private readonly ILogger<TRequest> _logger;
        private readonly IUser _user;

        public Loggingbehaviour(
            IUser user,
            ILogger<TRequest> logger)
        {
            _user = user;
            _logger = logger;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;
            var userId = _user.Id;
            var userName = _user.UserName;

            _logger.LogInformation("ExpenseVault Request: {Name} {@UserId} {@UserName} {@Request}", requestName, userId, userName, request);

            return await next();
        }
    }
}
