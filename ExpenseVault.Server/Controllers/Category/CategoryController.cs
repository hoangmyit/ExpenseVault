using ExpenseVault.Server.Infrastructures;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using EV.Application.Common.Model;
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
        var categoryGroup = app.MapRouteGroup(this);

        //categoryGroup.MapRouteGet(GetCategories);
        //categoryGroup.WithMetadata(new OpenApiOperationAttribute(nameof(GetCategories), "Get a paginated list of categories", "Retrieves a paginated list of categories"));

        //categoryGroup.MapRoutePost(CreatedAsync);
        //categoryGroup.WithMetadata(new OpenApiOperationAttribute(nameof(CreatedAsync), "Create a new category", "Creates a new category"));

        //categoryGroup.MapRouteGet(GetCategoryByIdAsync, "/{id:guid}");
        //categoryGroup.WithMetadata(new OpenApiOperationAttribute(nameof(GetCategoryByIdAsync), "Get a category by ID", "Retrieves a category by its ID"));

        //categoryGroup.MapRoutePut(UpdateCategoryAsync, "/{id:guid}");
        //categoryGroup.WithMetadata(new OpenApiOperationAttribute(nameof(UpdateCategoryAsync), "Update a category by ID", "Updates a category by its ID"));

        //categoryGroup.MapRouteDelete(DeleteCategoryAsync, "/{id:guid}");
        //categoryGroup.WithMetadata(new OpenApiOperationAttribute(nameof(DeleteCategoryAsync), "Delete a category by ID", "Deletes a category by its ID"));


        categoryGroup.MapGet("/", GetCategories)
               .WithMetadata(new OpenApiOperationAttribute(nameof(GetCategories), "Get a paginated list of categories", "Retrieves a paginated list of categories"));

        categoryGroup.MapPost("/", CreatedAsync)
            .WithMetadata(new OpenApiOperationAttribute(nameof(CreatedAsync), "Create a new category", "Creates a new category"));

        categoryGroup.MapGet("/{id:guid}", GetCategoryByIdAsync)
            .WithMetadata(new OpenApiOperationAttribute(nameof(GetCategoryByIdAsync), "Get a category by ID", "Retrieves a category by its ID"));

        categoryGroup.MapPut("/{id:guid}", UpdateCategoryAsync)
            .WithMetadata(new OpenApiOperationAttribute(nameof(UpdateCategoryAsync), "Update a category by ID", "Updates a category by its ID"));

        categoryGroup.MapDelete("/{id:guid}", DeleteCategoryAsync)
            .WithMetadata(new OpenApiOperationAttribute(nameof(DeleteCategoryAsync), "Delete a category by ID", "Deletes a category by its ID"));
    }
    public async Task<Ok<PaginatedList<CategoryDto>>> GetCategories(ISender sender, [AsParameters] GetCategoryPaginationQuery query, CancellationToken cancellationToken)
    {
        var categories = await sender.Send(query, cancellationToken);
        return TypedResults.Ok(categories);
    }

    public async Task<Created<Guid>> CreatedAsync(ISender sender, [FromBody] CreateCategoryCommand command, CancellationToken cancellationToken)
    {
        var id = await sender.Send(command, cancellationToken);
        return TypedResults.Created<Guid>($"/category/{id}", id);
    }

    public async Task<Results<Ok<CategoryDto>, NotFound>> GetCategoryByIdAsync(ISender sender, Guid id, CancellationToken cancellationToken)
    {
        var category = await sender.Send(new GetCategoryByIdQuery(id), cancellationToken);

        if (category == null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(category);
    }

    public async Task<Results<NoContent, BadRequest>> UpdateCategoryAsync(ISender sender, Guid id, [FromBody] UpdateCategoryCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return TypedResults.BadRequest();
        }
        await sender.Send(command, cancellationToken);
        return TypedResults.NoContent();
    }

    public async Task<Results<NoContent, BadRequest, NotFound>> DeleteCategoryAsync(ISender sender, Guid id, CancellationToken cancellationToken)
    {
        await sender.Send(new DeleteCategoryCommand(id), cancellationToken);
        return TypedResults.NoContent();
    }
}
