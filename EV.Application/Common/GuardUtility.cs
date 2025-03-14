using EV.Application.Common.Exceptions;
using System.Security.Authentication;

namespace EV.Application.Common.Utilities
{
    public static partial class GuardUtilities
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

        public static void AgainstValidationException(this IGuardClause guard, bool condition, string fieldName, string message = "The operation is invalid.")
        {
            if (condition)
            {
                throw new CustomValidationException(fieldName, message);
            }
        }

        public static async Task AgainstValidationExceptionAsync(this IGuardClause guard, Task<bool> conditionTask, string fieldName, string message = "The operation is invalid.")
        {
            if (await conditionTask)
            {
                throw new CustomValidationException(fieldName, message);
            }
        }

        public static void AgainstBadRequest(this IGuardClause guard, bool condition, string message = "The request is invalid.")
        {
            if (condition)
            {
                throw new BadRequestException(message);
            }
        }
    }
}
