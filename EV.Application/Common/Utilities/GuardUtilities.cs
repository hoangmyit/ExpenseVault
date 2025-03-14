using EV.Application.Common.Exceptions;
using EV.Application.Common.Interfaces;
using System.Security.Authentication;

namespace EV.Application.Common.Utilities
{
    public static partial class GuardUtilities
    {
        public static async Task AgainstForbiddenAccess(
            this IGuardClause guard, 
            IPermissionService permissionService,
            string userId, 
            string permission, 
            string message = "You do not have permission to access this resource.")
        {
            if (!await permissionService.HasPermissionAsync(userId, permission))
            {
                throw new ForbiddenAccessException(message, new[] { permission });
            }
        }

        public static async Task AgainstForbiddenAccessAny(
            this IGuardClause guard, 
            IPermissionService permissionService,
            string userId, 
            string[] permissions, 
            string message = "You need at least one of the required permissions to access this resource.")
        {
            if (!await permissionService.HasAnyPermissionAsync(userId, permissions))
            {
                throw new ForbiddenAccessException(message, permissions);
            }
        }

        public static async Task AgainstForbiddenAccessAll(
            this IGuardClause guard, 
            IPermissionService permissionService,
            string userId, 
            string[] permissions, 
            string message = "You need all the required permissions to access this resource.")
        {
            if (!await permissionService.HasAllPermissionsAsync(userId, permissions))
            {
                throw new ForbiddenAccessException(message, permissions);
            }
        }
    }
}
