namespace EV.Application.Common.Interfaces
{
    /// <summary>
    /// Defines methods for checking user permissions.
    /// </summary>
    public interface IPermissionService
    {
        /// <summary>
        /// Checks if the user has a specific permission.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="permission">The permission to check.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the user has the permission.</returns>
        Task<bool> HasPermissionAsync(string userId, string permission);

        /// <summary>
        /// Checks if the user has any of the specified permissions.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="permissions">The permissions to check.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the user has any of the permissions.</returns>
        Task<bool> HasAnyPermissionAsync(string userId, params string[] permissions);

        /// <summary>
        /// Checks if the user has all of the specified permissions.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="permissions">The permissions to check.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the user has all of the permissions.</returns>
        Task<bool> HasAllPermissionsAsync(string userId, params string[] permissions);

        /// <summary>
        /// Gets the permissions of the user.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains an enumerable of the user's permissions.</returns>
        Task<IEnumerable<string>> GetUserPermissionsAsync(string userId);
    }
}

