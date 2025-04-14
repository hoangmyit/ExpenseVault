using EV.Application.Authorization;
using EV.Application.Common.Interfaces;
using EV.Application.Common.Models;
using EV.Domain.Constants;
using EV.Infrastructure.Data;
using EV.Infrastructure.Data.Interceptors;
using EV.Infrastructure.Identity;
using EV.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EV.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            Guard.Against.NullOrEmpty(connectionString, $"Connection string {nameof(connectionString)} is null or empty");

            services.AddDependencyInjection(configuration);

            services.AddDbContext<ApplicationDbContext>((sp, options) =>
            {
                options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
                options.UseSqlServer(connectionString);
            });

            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

            services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddScoped<ApplicationDbContextInitialiser>();
            services.AddScoped<IPermissionService, PermissionService>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Permissions.Categories.Create, policy => policy.Requirements.Add(new PermissionRequirement(Permissions.Categories.Create)));
                options.AddPolicy(Permissions.Categories.View, policy => policy.Requirements.Add(new PermissionRequirement(Permissions.Categories.View)));
                options.AddPolicy(Permissions.Categories.Delete, policy => policy.Requirements.Add(new PermissionRequirement(Permissions.Categories.Delete)));
                options.AddPolicy(Permissions.Categories.Edit, policy => policy.Requirements.Add(new PermissionRequirement(Permissions.Categories.Edit)));
            });

            services.AddSingleton(TimeProvider.System);

            return services;
        }

        private static void AddDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IApplicationDbContext, ApplicationDbContext>()
                .AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>()
                .AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();
            services.Configure<AppSettings>(configuration);
            services.AddSingleton<IAppSettingsService, AppSettingsService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddTransient<IEmailService, EmailService>();
        }
    }
}
