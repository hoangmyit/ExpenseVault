using System.Reflection;
using EV.Application.Authorization;
using EV.Application.Categories.Queries;
using EV.Application.Common.Behaviors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace EV.Application
{
    public static class DependencyInjection
    {
        public static void AddApplicationService(this IHostApplicationBuilder builder)
        {
            builder.Services
              .AddAutoMapper(Assembly.GetExecutingAssembly())
              .AddAutoMapper(typeof(CategoryProfile))
              .AddValidatorsFromAssembly(Assembly.GetExecutingAssembly())
              .AddScoped<IAuthorizationHandler, PermissionHandler>()
              .AddMediatR(cfg =>
              {
                  cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());
                  cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehaviour<,>));
                  cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(PerformanceBehaviour<,>));
                  cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
                  cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(Loggingbehaviour<,>));
                  //cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehaviour<,>));
              });
        }
    }
}
