using System;
using System.Security.Authentication;

namespace EV.Application.Common.Utilities
{
    public static class GuardUtilities
    {
        public static void AgainstUnauthorized(this IGuardClause guard, bool condition, string message = "You do not have permission to access this resource.")
        {
            if (condition)
            {
                throw new UnauthorizedAccessException(message);
            }
        }

        public static void AgainstUnauthenticated(this IGuardClause guard, bool condition, string message = "Authentication failed.")
        {
            if (condition)
            {
                throw new AuthenticationException(message);
            }
        }
    }
}
