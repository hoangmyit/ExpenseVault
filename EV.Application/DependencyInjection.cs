using System.Reflection;
using EV.Application.Categories.Queries;
using FluentValidation.AspNetCore;
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
              .AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
        }
    }
}
