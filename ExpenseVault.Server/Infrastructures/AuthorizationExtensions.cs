using System.Security.Claims;
using EV.Application.Common.Interfaces;

namespace ExpenseVault.Server.Infrastructures;

public static class AuthorizationExtensions
{
    public static RouteHandlerBuilder RequirePermission(
     this RouteHandlerBuilder builder,
     string permission)
    {
        builder.AddEndpointFilter(async (context, next) =>
        {
            Console.WriteLine($"Checking permission: {permission} for path: {context.HttpContext.Request.Path}");
            var permissionService = context.HttpContext.RequestServices
                .GetRequiredService<IPermissionService>();

            var userId = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Results.Unauthorized();
            }

            if (!await permissionService.HasPermissionAsync(userId, permission))
            {
                return Results.Forbid();
            }

            return await next(context);
        });

        return builder;
    }

    public static RouteGroupBuilder RequireAnyPermission(
        this RouteGroupBuilder builder,
        params string[] permissions)
    {
        builder.AddEndpointFilter(async (context, next) =>
        {
            var permissionService = context.HttpContext.RequestServices
                .GetRequiredService<IPermissionService>();

            var userId = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Results.Unauthorized();
            }

            if (!await permissionService.HasAnyPermissionAsync(userId, permissions))
            {
                return Results.Forbid();
            }

            return await next(context);
        });

        return builder;
    }

    public static RouteGroupBuilder RequireAllPermissions(
        this RouteGroupBuilder builder,
        params string[] permissions)
    {
        builder.AddEndpointFilter(async (context, next) =>
        {
            var permissionService = context.HttpContext.RequestServices
                .GetRequiredService<IPermissionService>();

            var userId = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Results.Unauthorized();
            }

            if (!await permissionService.HasAllPermissionsAsync(userId, permissions))
            {
                return Results.Forbid();
            }

            return await next(context);
        });

        return builder;
    }
}
