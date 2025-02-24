using EV.Application.Common.Interface;
using EV.Infrastructure.Data;
using EV.Infrastructure.Data.Interceptors;
using EV.Infrastructure.Identity;
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

            services.AddDependencyInjection();

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

            services.AddSingleton(TimeProvider.System);

            return services;
        }

        private static void AddDependencyInjection(this IServiceCollection services)
        {
            services.AddScoped<IApplicationDbContext, ApplicationDbContext>()
                .AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>()
                .AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();
        }
    }
}
