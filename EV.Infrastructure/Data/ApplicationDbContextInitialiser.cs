using EV.Domain.Constants;
using EV.Domain.Entities;
using EV.Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace EV.Infrastructure.Data
{

    public static class WebApllicationExtension
    {
        public static async Task InitializeDatabaseAsync(this WebApplication webApp)
        {
            using var scope = webApp.Services.CreateScope();
            var appInitialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();

            await appInitialiser.InitialiseAsync();
            await appInitialiser.TrySeedAsync();
        }
    }
    public class ApplicationDbContextInitialiser
    {
        private readonly ILogger<ApplicationDbContextInitialiser> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;

        public ApplicationDbContextInitialiser(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            ILogger<ApplicationDbContextInitialiser> logger,
            RoleManager<IdentityRole<Guid>> roleManager)
        {
            _userManager = userManager;
            _context = context;
            _logger = logger;
            _roleManager = roleManager;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                await _context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initialising the database.");
                throw;
            }
        }


        public async Task TrySeedAsync()
        {
            try
            {
                var adminRole = new IdentityRole<Guid>()
                {
                    Id = Common.ADMIN_ROLE_ID,
                    Name = Roles.Administrator
                };
                if (!await _roleManager.RoleExistsAsync(adminRole.Name))
                {
                    await _roleManager.CreateAsync(adminRole);
                }
                var userRole = new IdentityRole<Guid>()
                {
                    Id = Common.USER_ROLE_ID,
                    Name = Roles.User
                };
                if (!await _roleManager.RoleExistsAsync(userRole.Name))
                {
                    await _roleManager.CreateAsync(userRole);
                }
                var managerRole = new IdentityRole<Guid>()
                {
                    Id = Common.MANAGER_ROLE_ID,
                    Name = Roles.Manager
                };
                if (!await _roleManager.RoleExistsAsync(managerRole.Name))
                {
                    await _roleManager.CreateAsync(managerRole);
                }

                var adminUser = new ApplicationUser
                {
                    Id = Common.ADMIN_ROLE_ID,
                    UserName = "admin",
                    Email = "admin@localhost.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                };
                var userInDB = await _userManager.FindByEmailAsync(adminUser.Email);
                if (userInDB == null)
                {
                    var result = await _userManager.CreateAsync(adminUser, "-Mydev123");
                    await _context.SaveChangesAsync();
                    if (result.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(adminUser, adminRole.Name);
                    }
                    else
                    {
                        _logger.LogError("An error occurred while seeding the database.");
                    }
                }

                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid(),
                    UserName = "testUser",
                    Email = "testUser@localhost.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                };
                var testInDB = await _userManager.FindByEmailAsync(user.Email);
                if (testInDB == null)
                {
                    var result = await _userManager.CreateAsync(user, "-Mydev123");
                    await _context.SaveChangesAsync();
                    if (result.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(user, userRole.Name);
                    }
                    else
                    {
                        _logger.LogError("An error occurred while seeding the database.");
                    }
                }

                var managerUser = new ApplicationUser
                {
                    Id = Guid.NewGuid(),
                    UserName = "manager",
                    Email = "manager@localhost.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                };
                var managerUserInDB = await _userManager.FindByEmailAsync(managerUser.Email);
                if (managerUserInDB == null)
                {
                    var result = await _userManager.CreateAsync(managerUser, "-Mydev123");
                    await _context.SaveChangesAsync();
                    if (result.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(managerUser, managerRole.Name);
                    }
                    else
                    {
                        _logger.LogError("An error occurred while seeding the database.");
                    }
                }

                if (!_context.Categories.Any())
                {
                    await _context.Categories.AddRangeAsync(
                        new Category()
                        {
                            Description = "Bank account",
                            Name = "Bank",
                            Avatar = "",
                            IsDefault = false,
                            Id = Common.BANK_ID,
                        },
                        new Category()
                        {
                            Description = "Cash account",
                            Name = "Cash",
                            Avatar = "",
                            IsDefault = true,
                            Id = Common.CASH_ID,
                        }
                    );
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }
    }
}
