using ExpenseVault.Server.Infrastructures;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using EV.Application.Common.Models;
using EV.Application.Categories.Queries;
using Microsoft.AspNetCore.Mvc;
using EV.Application.Categories.Commands;
using EV.Application.Categories.Commands.UpdateCategory;
using NSwag.Annotations;
using EV.Application.Categories.Commands.DeleteCategory;

namespace ExpenseVault.Server.Controllers.Category;
public class CategoryController : BaseController
{
    public override void MapRoutes(WebApplication app)
    {
        var categoryGroup = app.MapRouteGroup(this).RequireAuthorization();

        var categoryies = categoryGroup.MapRouteGet(GetCategories)
            .RequirePermission("Category:R")
            .WithMetadata(new OpenApiOperationAttribute(nameof(GetCategories), "Get a paginated list of categories", "Retrieves a paginated list of categories"));

        var category = categoryGroup.MapRouteGet(GetCategoryByIdAsync, "/{id:int}")
            .RequirePermission("Category:R")
            .WithMetadata(new OpenApiOperationAttribute(nameof(GetCategoryByIdAsync), "Get a category by ID", "Retrieves a category by its ID"));

        var categoryPost = categoryGroup.MapRoutePost(CreatedAsync)
            .RequirePermission("Category:C")
            .WithMetadata(new OpenApiOperationAttribute(nameof(CreatedAsync), "Create a new category", "Creates a new category"));

        var categoryUpdate = categoryGroup.MapRoutePut(UpdateCategoryAsync, "/{id:int}")
            .RequirePermission("Category:U")
            .WithMetadata(new OpenApiOperationAttribute(nameof(UpdateCategoryAsync), "Update a category by ID", "Updates a category by its ID"));

        var categoryDelete = categoryGroup.MapRouteDelete(DeleteCategoryAsync, "/{id:int}")
            .RequirePermission("Category:D")
            .WithMetadata(new OpenApiOperationAttribute(nameof(DeleteCategoryAsync), "Delete a category by ID", "Deletes a category by its ID"));
    }
    public async Task<Ok<PaginatedList<CategoryDto>>> GetCategories(ISender sender, [AsParameters] GetCategoryPaginationQuery query, CancellationToken cancellationToken)
    {
        var categories = await sender.Send(query, cancellationToken);
        var filteredCategories = categories.Items.Where(c => !c.IsDelete).ToList();
        var paginatedList = new PaginatedList<CategoryDto>(filteredCategories, categories.TotalCount, categories.PageIndex, categories.TotalCount);
        return TypedResults.Ok(paginatedList);
    }

    public async Task<Created<int>> CreatedAsync(ISender sender, [FromBody] CreateCategoryCommand command, CancellationToken cancellationToken)
    {
        var id = await sender.Send(command, cancellationToken);
        return TypedResults.Created<int>($"/category/{id}", id);
    }

    public async Task<Results<Ok<CategoryDto>, NotFound<string>>> GetCategoryByIdAsync(ISender sender, int id, CancellationToken cancellationToken)
    {
        var category = await sender.Send(new GetCategoryByIdQuery(id), cancellationToken);

        if (category == null || category.IsDelete)
        {
            return TypedResults.NotFound($"Category with ID {id} not found");
        }

        return TypedResults.Ok(category);
    }

    public async Task<Results<NoContent, BadRequest<string>>> UpdateCategoryAsync(ISender sender, Guid id, [FromBody] UpdateCategoryCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return TypedResults.BadRequest("Invalid category data provided");
        }
        await sender.Send(command, cancellationToken);
        return TypedResults.NoContent();
    }

    public async Task<Results<NoContent, BadRequest, NotFound>> DeleteCategoryAsync(ISender sender, int id, CancellationToken cancellationToken)
    {
        await sender.Send(new DeleteCategoryCommand(id), cancellationToken);
        return TypedResults.NoContent();
    }
}
