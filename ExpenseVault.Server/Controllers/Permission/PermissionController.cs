using EV.Application.Identity.Queries;
using ExpenseVault.Server.Infrastructures;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ExpenseVault.Server.Controllers.Permission;

public class PermissionController : BaseController
{
    public override void MapRoutes(WebApplication app)
    {
        var builder = app.MapRouteGroup(this)
            .RequireAuthorization();

        builder.MapRouteGet(GetPermissionsAsync, "permissions");

        builder.MapRouteGet(GetUserPermissionsAsync, "permissions/{id:guid}")
            .RequirePermission("Permission:R");
    }

    public async Task<Ok<IEnumerable<string>>> GetPermissionsAsync(ISender sender, CancellationToken cancellationToken)
    {
        var permissions = await sender.Send(new GetCurrentUserPermissionQuery(), cancellationToken);
        return TypedResults.Ok(permissions);
    }

    public async Task<Ok<IEnumerable<string>>> GetUserPermissionsAsync(ISender sender, Guid id, CancellationToken cancellationToken)
    {
        var permissions = await sender.Send(new GetUserPermissionQuery(id), cancellationToken);
        return TypedResults.Ok(permissions);
    }
}
