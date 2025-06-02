using EV.Application.CategoryGroups.Queries;
using EV.Application.Common.Dtos;
using ExpenseVault.Server.Infrastructures;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using NSwag.Annotations;

namespace ExpenseVault.Server.Controllers.CategoryGroup;

public class CategoryGroupController : BaseController
{
    public override void MapRoutes(WebApplication app)
    {
        var categoryGroup = app.MapRouteGroup(this).RequireAuthorization();

        categoryGroup.MapRouteGet(GetCategoryGroups)
            .RequirePermission("CategoryGroup:R")
            .WithMetadata(new OpenApiOperationAttribute(nameof(GetCategoryGroups), "Get a paginated list of category groups", "Retrieves a paginated list of category groups"));
    }

    public async Task<Ok<IList<CategoryGroupDto>>> GetCategoryGroups(
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GetCategoryGroupQuery();
        var categoryGroups = await sender.Send(query, cancellationToken);
        return TypedResults.Ok(categoryGroups);
    }
}
