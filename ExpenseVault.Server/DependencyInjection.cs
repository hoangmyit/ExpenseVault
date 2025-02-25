using EV.Application.Common.Interface;
using EV.Infrastructure.Data;
using ExpenseVault.Server.Services;

namespace ExpenseVault.Server;

public static class DependencyInjection
{
    public static IServiceCollection AddWebServices(this IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();

        services.AddScoped<IUser, CurrentUser>();

        services.AddHttpContextAccessor();

        services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>();

        services.AddEndpointsApiExplorer();

        services.AddOpenApiDocument();

        return services;
    }
}
