namespace EV.Application.Common.Interfaces;

public interface IPermissionService
{
    Task<bool> HasPermissionAsync(string userId, string permission);
    Task<bool> HasAnyPermissionAsync(string userId, params string[] permissions);
    Task<bool> HasAllPermissionsAsync(string userId, params string[] permissions);
    Task<IEnumerable<string>> GetUserPermissionsAsync(string userId);
}
