using Microsoft.AspNetCore.Identity;

namespace EV.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string RefreshToken { get; set; }
        public DateTimeOffset RefreshTokenExpiryTime { get; set; }
    }
}
