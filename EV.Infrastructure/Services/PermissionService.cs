using EV.Application.Common.Interfaces;
using EV.Domain.Constants;
using EV.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace EV.Infrastructure.Services;

public class PermissionService : IPermissionService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;
    private readonly ILogger<PermissionService> _logger;

    public PermissionService(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole<Guid>> roleManager,
        ILogger<PermissionService> logger)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _logger = logger;
    }

    public async Task<bool> HasPermissionAsync(string userId, string permission)
    {
        try
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(permission))
                return false;

            var permissions = await GetUserPermissionsAsync(userId);
            return permissions.Contains(permission);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking permission {Permission} for user {UserId}", permission, userId);
            return false;
        }
    }

    public async Task<bool> HasAnyPermissionAsync(string userId, params string[] permissions)
    {
        try
        {
            if (string.IsNullOrEmpty(userId) || permissions == null || !permissions.Any())
                return false;

            var userPermissions = await GetUserPermissionsAsync(userId);
            return permissions.Any(p => userPermissions.Contains(p));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking any permissions for user {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> HasAllPermissionsAsync(string userId, params string[] permissions)
    {
        try
        {
            if (string.IsNullOrEmpty(userId) || permissions == null || !permissions.Any())
                return false;

            var userPermissions = await GetUserPermissionsAsync(userId);
            return permissions.All(p => userPermissions.Contains(p));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking all permissions for user {UserId}", userId);
            return false;
        }
    }

    public async Task<IEnumerable<string>> GetUserPermissionsAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return Enumerable.Empty<string>();

        // Get user claims directly
        var userClaims = await _userManager.GetClaimsAsync(user);
        var directPermissions = userClaims
            .Where(c => c.Type == "Permission")
            .Select(c => c.Value)
            .ToList();

        // Get user roles
        var userRoles = await _userManager.GetRolesAsync(user);
        
        // Get permissions from roles
        var rolePermissions = new List<string>();
        foreach (var roleName in userRoles)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role != null)
            {
                var roleClaims = await _roleManager.GetClaimsAsync(role);
                var permissions = roleClaims
                    .Where(c => c.Type == "Permission")
                    .Select(c => c.Value);
                
                rolePermissions.AddRange(permissions);
                
                // Add default permissions based on role
                rolePermissions.AddRange(GetDefaultPermissionsForRole(roleName));
            }
        }

        // Combine and return distinct permissions
        return directPermissions.Union(rolePermissions).Distinct();
    }

    private static IEnumerable<string> GetDefaultPermissionsForRole(string roleName)
    {
        return roleName switch
        {
            Roles.Administrator => new[]
            {
                Permissions.Categories.View, Permissions.Categories.Create, 
                Permissions.Categories.Edit, Permissions.Categories.Delete,
                
                Permissions.Expenses.View, Permissions.Expenses.Create, 
                Permissions.Expenses.Edit, Permissions.Expenses.Delete,
                
                Permissions.Reports.View, Permissions.Reports.Create, Permissions.Reports.Export,
                
                Permissions.Users.View, Permissions.Users.Create, 
                Permissions.Users.Edit, Permissions.Users.Delete
            },
            
            Roles.Manager => new[]
            {
                Permissions.Categories.View, 
                Permissions.Categories.Create, 
                Permissions.Categories.Edit,
                
                Permissions.Expenses.View, Permissions.Expenses.Create, 
                Permissions.Expenses.Edit, Permissions.Expenses.Delete,
                
                Permissions.Reports.View, Permissions.Reports.Create, Permissions.Reports.Export,
                
                Permissions.Users.View
            },
            
            Roles.User => new[]
            {
                Permissions.Categories.View,
                Permissions.Expenses.View, Permissions.Expenses.Create, Permissions.Expenses.Edit,
                Permissions.Reports.View
            },
            
            _ => Array.Empty<string>()
        };
    }
}
