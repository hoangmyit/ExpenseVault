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

            var userPermissions = await GetUserPermissionsAsync(userId);
            return CheckPermissionMatch(userPermissions, permission);
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
            return permissions.Any(p => CheckPermissionMatch(userPermissions, p));
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
            return permissions.All(p => CheckPermissionMatch(userPermissions, p));
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

    private bool CheckPermissionMatch(IEnumerable<string> userPermissions, string requiredPermission)
    {
        // Direct match
        if (userPermissions.Contains(requiredPermission))
            return true;

        // Extract resource and operation parts
        var parts = requiredPermission.Split(':');
        if (parts.Length != 2)
            return false;

        var resource = parts[0];
        var operation = parts[1];

        // Check for wildcard resource permissions (e.g., "Category:*")
        var wildcardPermission = $"{resource}:*";
        if (userPermissions.Contains(wildcardPermission))
            return true;

        // Check for specific operation in the user's permissions
        foreach (var userPermission in userPermissions)
        {
            var userParts = userPermission.Split(':');
            if (userParts.Length != 2)
                continue;

            var userResource = userParts[0];
            var userOperations = userParts[1];

            // If resources match and operation is included in user operations
            if (userResource == resource &&
                (userOperations == "*" ||
                 CheckOperationMatch(userOperations, operation)))
            {
                return true;
            }
        }

        return false;
    }

    private bool CheckOperationMatch(string userOperations, string requiredOperation)
    {
        // For single-character operations like "R", "C", "U", "D"
        if (requiredOperation.Length == 1)
        {
            return userOperations.Contains(requiredOperation);
        }

        // For operation combinations like "CRUD"
        foreach (char op in requiredOperation)
        {
            if (!userOperations.Contains(op))
                return false;
        }

        return true;
    }

    private static IEnumerable<string> GetDefaultPermissionsForRole(string roleName)
    {
        return roleName switch
        {
            Roles.Administrator => new[]
            {
                "Category:*",
                "Expense:*",
                "Report:*",
                "User:*"
            },

            Roles.Manager => new[]
            {
                "Category:CRU",
                "Expense:CRUD",
                "Report:CRE",
                "User:R"
            },

            Roles.User => new[]
            {
                "Category:R",
                "Expense:CRUD",
                "Report:R"
            },

            _ => Array.Empty<string>()
        };
    }
}
