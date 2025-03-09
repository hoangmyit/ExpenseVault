using System.Security.Claims;
using EV.Application.Common.Interfaces;
using EV.Domain.Constants;

namespace ExpenseVault.Server.Services;

public class CurrentUser : IUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid Id => Guid.Parse(_httpContextAccessor?.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? Common.ADMIN_ID.ToString());
}
