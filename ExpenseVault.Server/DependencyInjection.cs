﻿using EV.Application.Common.Interface;
using EV.Infrastructure.Data;
using ExpenseVault.Server.Services;
using NSwag.Generation.Processors.Security;
using NSwag;

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

        // Add NSwag configuration
        services.AddOpenApiDocument(configure =>
        {
            configure.Title = "Expense Vault API";
            configure.Version = "v1";
            configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
            {
                Type = OpenApiSecuritySchemeType.ApiKey,
                Name = "Authorization",
                In = OpenApiSecurityApiKeyLocation.Header,
                Description = "Type into the textbox: 'Bearer {your JWT token}'."
            });

            configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
        });


        return services;
    }
}
