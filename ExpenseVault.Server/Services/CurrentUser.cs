using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using EV.Application.Common.Interfaces;
using EV.Domain.Constants;

namespace ExpenseVault.Server.Services;

public class CurrentUser : IUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ClaimsPrincipal _user;
    public CurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        _user = _httpContextAccessor.HttpContext?.User ?? new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
              {
                  new Claim(ClaimTypes.NameIdentifier, Guid.Empty.ToString()),
                  new Claim(ClaimTypes.Name, "Anonymous"),
                  new Claim(ClaimTypes.Email, "Anonymous")
              }));
    }

    public Guid Id => Guid.Parse(_user.FindFirstValue(ClaimTypes.NameIdentifier) ?? Guid.Empty.ToString());
    public string UserName => _user.FindFirstValue(ClaimTypes.Name) ?? "Anonymous";
    public string Email => _user.FindFirstValue(ClaimTypes.Email) ?? "Anonymous";
}
