using EV.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace EV.Application.Common.Behaviors
{
    public class PerformanceBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
    {
        private readonly Stopwatch _timer;
        private readonly ILogger<TRequest> _logger;
        private readonly IUser _user;

        public PerformanceBehaviour(
            IUser user,
            ILogger<TRequest> logger)
        {
            _timer = new Stopwatch();
            _user = user;
            _logger = logger;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {

            _timer.Start();
            var response = await next();
            _timer.Stop();

            var elapsedMilliseconds = _timer.ElapsedMilliseconds;
            if (elapsedMilliseconds > 500)
            {
                var requestName = typeof(TRequest).Name;
                _logger.LogWarning("ExpenseVault Long Running Request: {Name} ({ElapsedMilliseconds} milliseconds) {@UserId} {@UserName} {@UserEmail} {@Request}",
                    requestName, elapsedMilliseconds, _user.Id, _user.UserName, _user.Email, request);
            }

            return response;
        }
    }
}
