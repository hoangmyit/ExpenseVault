using EV.Domain.Constants;
using EV.Domain.Entities;
using EV.Domain.Enums;
using EV.Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace EV.Infrastructure.Data
{
    public static class WebApplicationExtension
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
                _logger.LogInformation("Initializing database...");
                await _context.Database.MigrateAsync().ConfigureAwait(false);
                _logger.LogInformation("Database initialized successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initializing the database.");
                throw;
            }
        }

        public async Task TrySeedAsync()
        {
            try
            {
                _logger.LogInformation("Seeding database...");
                await SeedRolesAsync().ConfigureAwait(false);
                await SeedUsersAsync().ConfigureAwait(false);
                await SeedCategoryGroupAsync().ConfigureAwait(false);
                await SeedCategoryAsync().ConfigureAwait(false);
                _logger.LogInformation("Database seeded successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }

        #region private methods

        private async Task SeedRolesAsync()
        {
            if (await _roleManager.Roles.AnyAsync().ConfigureAwait(false))
            {
                _logger.LogInformation("Roles already exist. Skipping role seeding.");
                return;
            }

            await CreateRoleAsync(Common.ADMIN_ROLE_ID, Roles.Administrator).ConfigureAwait(false);
            await CreateRoleAsync(Common.USER_ROLE_ID, Roles.User).ConfigureAwait(false);
            await CreateRoleAsync(Common.MANAGER_ROLE_ID, Roles.Manager).ConfigureAwait(false);
        }

        private async Task CreateRoleAsync(Guid roleId, string roleName)
        {
            var role = new IdentityRole<Guid>()
            {
                Id = roleId,
                Name = roleName
            };

            if (!await _roleManager.RoleExistsAsync(role.Name).ConfigureAwait(false))
            {
                var result = await _roleManager.CreateAsync(role).ConfigureAwait(false);
                if (!result.Succeeded)
                {
                    _logger.LogError("An error occurred while creating the role {RoleName}.", roleName);
                    throw new Exception($"Failed to create role {roleName}");
                }
            }
        }

        private async Task SeedUsersAsync()
        {
            if (await _userManager.Users.AnyAsync().ConfigureAwait(false))
            {
                _logger.LogInformation("Users already exist. Skipping user seeding.");
                return;
            }

            await CreateUserAsync(Common.ADMIN_USER_ID, "admin", "admin@local.com", "-Mydev123", Roles.Administrator).ConfigureAwait(false);
            await CreateUserAsync(Guid.NewGuid(), "testUser", "test-user@local.com", "-Mydev123", Roles.User).ConfigureAwait(false);
            await CreateUserAsync(Guid.NewGuid(), "manager", "manager@local.com", "-Mydev123", Roles.Manager).ConfigureAwait(false);
        }

        private async Task CreateUserAsync(Guid userId, string userName, string email, string password, string userRole)
        {
            var user = new ApplicationUser()
            {
                Id = userId,
                UserName = userName,
                Email = email,
            };

            var userInDB = await _userManager.FindByEmailAsync(user.Email).ConfigureAwait(false);
            if (userInDB == null)
            {
                var result = await _userManager.CreateAsync(user, password).ConfigureAwait(false);
                var result1 = await _userManager.AddToRoleAsync(user, userRole);
                if (!result.Succeeded)
                {
                    _logger.LogError("An error occurred while creating the user {UserName}.", userName);
                    throw new Exception($"Failed to create user {userName}");
                }
            }
        }

        private async Task SeedCategoryGroupAsync()
        {
            if (_context.CategoryGroups.Any())
            {
                _logger.LogInformation("Category groups already exist. Skipping category group seeding.");
                return;
            }

            var categoryGroups = new List<CategoryGroup>()
            {
                new()
                {
                    Id = 1,
                    Name = "Income Sources",
                    Description = "These represent all sources of money coming into your finances.",
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                    TransactionType = TransactionType.Income,
                },
                new()
                {
                    Id = 2,
                    Name = "Essential Expenses",
                    Description = "These are necessary costs required for daily living.",
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                    TransactionType = TransactionType.Expense,
                },
                new()
                {
                    Id = 3,
                    Name = "Financial Obligations",
                    Description = "These are expenses tied to financial commitments and future security.",
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                    TransactionType = TransactionType.Expense,
                },
                new()
                {
                    Id = 4,
                    Name = "Lifestyle & Personal",
                    Description = "Expenses related to leisure, hobbies, and everyday enjoyment.",
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                    TransactionType = TransactionType.Expense,
                },
                new()
                {
                    Id = 5,
                    Name = "Family & Social",
                    Description = "Expenses related to family, relationships, and personal responsibilities.",
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                    TransactionType = TransactionType.Expense,
                },
                new()
                {
                    Id = 6,
                    Name = "Business & Work",
                    Description = "Expenses incurred for professional and work-related activities.",
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                    TransactionType = TransactionType.Expense,
                },
            };

            try
            {
                await _context.Database.OpenConnectionAsync();
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.CategoryGroups ON");
                _context.CategoryGroups.AddRange(categoryGroups);
                await _context.SaveChangesAsync().ConfigureAwait(false);
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.CategoryGroups OFF");
                await _context.Database.CloseConnectionAsync();
            }
            catch (Exception)
            {
                _logger.LogError("An error occurred while seeding the category groups.");
                throw;
            }
        }

        private async Task SeedCategoryAsync()
        {
            if (_context.Categories.Any())
            {
                _logger.LogInformation("Categories already exist. Skipping category seeding.");
                return;
            }

            var categories = new List<Category>()
            {
                new()
                {
                    Id = 1,
                    Name = "Salary & Wages",
                    Description = "Fixed earnings from employment.",
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 2,
                    Name = "Bonuses & Incentives",
                    Description = "Extra income from performance-based rewards.",
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 3,
                    Name = "Freelance & Contract",
                    Description = "Payments from gig work, side projects, or independent contracts.",
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 4,
                    Name = "Investments & Dividends",
                    Description = "Earnings from stocks, bonds, or interest.",
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 5,
                    Name = "Business Revenue",
                    Description = "Income from owned businesses or self-employment.",
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 6,
                    Name = "Passive Income",
                    Description = "Rental income, royalties, affiliate marketing, or any automated earnings.",
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 7,
                    Name = "Other Income",
                    Description = "Miscellaneous earnings such as refunds, gifts, or unexpected financial gains.",
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                // Essential Expenses (Needs)
                new()
                {
                    Id = 8,
                    Name = "Housing",
                    Description = "Rent, mortgage payments, property tax, home maintenance.",
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 9,
                    Name = "Utilities",
                    Description = "Electricity, water, gas, internet, phone bills.",
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 10,
                    Name = "Groceries",
                    Description = "Food, beverages, and household essentials.",
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 11,
                    Name = "Transportation",
                    Description = "Fuel, public transit, car payments, insurance, maintenance.",
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 12,
                    Name = "Healthcare",
                    Description = "Medical bills, prescriptions, insurance, doctor visits.",
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                // Financial Obligations
                new()
                {
                    Id = 13,
                    Name = "Debt Payments",
                    Description = "Loan repayments, credit card bills, student loans.",
                    GroupId = 3,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 14,
                    Name = "Savings & Investments",
                    Description = "Contributions to savings accounts, retirement funds, stocks.",
                    GroupId = 3,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 15,
                    Name = "Taxes",
                    Description = "Income tax, property tax, business tax, self-employment tax.",
                    GroupId = 3,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                // Lifestyle & Personal
                new()
                {
                    Id = 16,
                    Name = "Dining & Entertainment",
                    Description = "Eating out, coffee shops, movies, concerts.",
                    GroupId = 4,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 17,
                    Name = "Shopping & Fashion",
                    Description = "Clothing, accessories, electronics, home décor.",
                    GroupId = 4,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 18,
                    Name = "Hobbies & Recreation",
                    Description = "Gym memberships, sports, travel, books, personal interests.",
                    GroupId = 4,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 19,
                    Name = "Subscriptions",
                    Description = "Streaming services, software licenses, membership fees.",
                    GroupId = 4,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                // Family & Social
                new()
                {
                    Id = 20,
                    Name = "Childcare & Education",
                    Description = "School fees, daycare, tuition, books, online courses.",
                    GroupId = 5,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 21,
                    Name = "Gifts & Donations",
                    Description = "Charity contributions, presents for friends & family.",
                    GroupId = 5,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 22,
                    Name = "Pets",
                    Description = "Pet food, grooming, vet bills, pet insurance.",
                    GroupId = 5,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                // Business & Work
                new()
                {
                    Id = 23,
                    Name = "Office & Supplies",
                    Description = "Stationery, office furniture, printing materials.",
                    GroupId = 6,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 24,
                    Name = "Software & Tools",
                    Description = "Business applications, SaaS subscriptions, cloud storage.",
                    GroupId = 6,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 25,
                    Name = "Professional Services",
                    Description = "Legal fees, consulting, accounting, business services.",
                    GroupId = 6,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 26,
                    Name = "Marketing & Advertising",
                    Description = "Ads, branding, promotional materials, marketing campaigns.",
                    GroupId = 6,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                }
            };

            try
            {

                await _context.Database.OpenConnectionAsync();
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Categories ON");
                _context.Categories.AddRange(categories);
                await _context.SaveChangesAsync().ConfigureAwait(false);
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Categories OFF");
                await _context.Database.CloseConnectionAsync();
            }
            catch (Exception)
            {
                _logger.LogError("An error occurred while seeding the categories.");
                throw;
            }
        }

        #endregion
    }
}

