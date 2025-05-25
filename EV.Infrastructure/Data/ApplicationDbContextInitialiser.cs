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
                EmailConfirmed = true,
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
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Salary & Wages" },
                        { "vi", "Lương và tiền công" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Fixed earnings from employment." },
                        { "vi", "Thu nhập cố định từ công việc." }
                    },
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 2,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Bonuses & Incentives" },
                        { "vi", "Thưởng và khuyến khích" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Extra income from performance-based rewards." },
                        { "vi", "Thu nhập thêm từ các phần thưởng dựa trên hiệu suất." }
                    },
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 3,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Freelance & Contract" },
                        { "vi", "Công việc tự do và hợp đồng" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Payments from gig work, side projects, or independent contracts." },
                        { "vi", "Thanh toán từ công việc tự do, dự án phụ hoặc hợp đồng độc lập." }
                    },
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 4,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Investments & Dividends" },
                        { "vi", "Đầu tư và cổ tức" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Earnings from stocks, bonds, or interest." },
                        { "vi", "Thu nhập từ cổ phiếu, trái phiếu hoặc lãi suất." }
                    },
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 5,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Business Revenue" },
                        { "vi", "Doanh thu kinh doanh" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Income from owned businesses or self-employment." },
                        { "vi", "Thu nhập từ doanh nghiệp sở hữu hoặc tự kinh doanh." }
                    },
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 6,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Passive Income" },
                        { "vi", "Thu nhập thụ động" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Rental income, royalties, affiliate marketing, or any automated earnings." },
                        { "vi", "Thu nhập từ cho thuê, tiền bản quyền, tiếp thị liên kết hoặc bất kỳ thu nhập tự động nào." }
                    },
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 7,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Other Income" },
                        { "vi", "Thu nhập khác" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Miscellaneous earnings such as refunds, gifts, or unexpected financial gains." },
                        { "vi", "Thu nhập khác như hoàn tiền, quà tặng hoặc các khoản thu nhập bất ngờ." }
                    },
                    GroupId = 1,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 8,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Housing" },
                        { "vi", "Nhà ở" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Rent, mortgage payments, property tax, home maintenance." },
                        { "vi", "Tiền thuê nhà, trả góp, thuế tài sản, bảo trì nhà cửa." }
                    },
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 9,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Utilities" },
                        { "vi", "Tiện ích" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Electricity, water, gas, internet, phone bills." },
                        { "vi", "Điện, nước, gas, internet, hóa đơn điện thoại." }
                    },
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 10,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Groceries" },
                        { "vi", "Hàng tạp hóa" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Food, beverages, and household essentials." },
                        { "vi", "Thực phẩm, đồ uống và các nhu yếu phẩm gia đình." }
                    },
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 11,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Transportation" },
                        { "vi", "Giao thông vận tải" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Fuel, public transit, car payments, insurance, maintenance." },
                        { "vi", "Nhiên liệu, giao thông công cộng, trả góp xe, bảo hiểm, bảo trì." }
                    },
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 12,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Healthcare" },
                        { "vi", "Chăm sóc sức khỏe" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Medical bills, prescriptions, insurance, doctor visits." },
                        { "vi", "Hóa đơn y tế, đơn thuốc, bảo hiểm, khám bác sĩ." }
                    },
                    GroupId = 2,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 13,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Debt Payments" },
                        { "vi", "Thanh toán nợ" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Loan repayments, credit card bills, student loans." },
                        { "vi", "Trả nợ vay, hóa đơn thẻ tín dụng, khoản vay sinh viên." }
                    },
                    GroupId = 3,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 14,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Savings & Investments" },
                        { "vi", "Tiết kiệm và đầu tư" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Contributions to savings accounts, retirement funds, stocks." },
                        { "vi", "Đóng góp vào tài khoản tiết kiệm, quỹ hưu trí, cổ phiếu." }
                    },
                    GroupId = 3,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 15,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Taxes" },
                        { "vi", "Thuế" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Income tax, property tax, business tax, self-employment tax." },
                        { "vi", "Thuế thu nhập, thuế tài sản, thuế kinh doanh, thuế tự doanh." }
                    },
                    GroupId = 3,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 16,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Dining & Entertainment" },
                        { "vi", "Ăn uống và giải trí" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Eating out, coffee shops, movies, concerts." },
                        { "vi", "Ăn ngoài, quán cà phê, xem phim, buổi hòa nhạc." }
                    },
                    GroupId = 4,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 17,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Shopping & Fashion" },
                        { "vi", "Mua sắm và thời trang" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Clothing, accessories, electronics, home décor." },
                        { "vi", "Quần áo, phụ kiện, đồ điện tử, trang trí nhà cửa." }
                    },
                    GroupId = 4,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 18,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Hobbies & Recreation" },
                        { "vi", "Sở thích và giải trí" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Gym memberships, sports, travel, books, personal interests." },
                        { "vi", "Thẻ thành viên phòng gym, thể thao, du lịch, sách, sở thích cá nhân." }
                    },
                    GroupId = 4,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 19,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Subscriptions" },
                        { "vi", "Đăng ký" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Streaming services, software licenses, membership fees." },
                        { "vi", "Dịch vụ phát trực tuyến, giấy phép phần mềm, phí thành viên." }
                    },
                    GroupId = 4,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 20,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Childcare & Education" },
                        { "vi", "Chăm sóc trẻ em và giáo dục" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "School fees, daycare, tuition, books, online courses." },
                        { "vi", "Học phí, nhà trẻ, học phí, sách, khóa học trực tuyến." }
                    },
                    GroupId = 5,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 21,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Gifts & Donations" },
                        { "vi", "Quà tặng và quyên góp" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Charity contributions, presents for friends & family." },
                        { "vi", "Đóng góp từ thiện, quà tặng cho bạn bè và gia đình." }
                    },
                    GroupId = 5,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 22,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Pets" },
                        { "vi", "Thú cưng" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Pet food, grooming, vet bills, pet insurance." },
                        { "vi", "Thức ăn cho thú cưng, chăm sóc, hóa đơn bác sĩ thú y, bảo hiểm thú cưng." }
                    },
                    GroupId = 5,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 23,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Office & Supplies" },
                        { "vi", "Văn phòng và vật tư" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Stationery, office furniture, printing materials." },
                        { "vi", "Đồ dùng văn phòng, nội thất văn phòng, tài liệu in ấn." }
                    },
                    GroupId = 6,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 24,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Software & Tools" },
                        { "vi", "Phần mềm và công cụ" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Business applications, SaaS subscriptions, cloud storage." },
                        { "vi", "Ứng dụng kinh doanh, đăng ký SaaS, lưu trữ đám mây." }
                    },
                    GroupId = 6,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 25,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Professional Services" },
                        { "vi", "Dịch vụ chuyên nghiệp" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Legal fees, consulting, accounting, business services." },
                        { "vi", "Phí pháp lý, tư vấn, kế toán, dịch vụ kinh doanh." }
                    },
                    GroupId = 6,
                    CreatedBy = Common.ADMIN_USER_ID,
                    Created = DateTimeOffset.Now,
                },
                new()
                {
                    Id = 26,
                    Name = new Dictionary<string, string>
                    {
                        { "en", "Marketing & Advertising" },
                        { "vi", "Tiếp thị và quảng cáo" }
                    },
                    Description = new Dictionary<string, string>
                    {
                        { "en", "Ads, branding, promotional materials, marketing campaigns." },
                        { "vi", "Quảng cáo, xây dựng thương hiệu, tài liệu quảng bá, chiến dịch tiếp thị." }
                    },
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

