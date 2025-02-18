using ExpenseVault.Server.Infrastructures;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using EV.Application.Common.Model;
using EV.Application.Categories.Queries;
using Microsoft.AspNetCore.Mvc;
using EV.Application.Categories.Commands;
using EV.Application.Categories.Commands.UpdateCategory;

namespace ExpenseVault.Server.Controllers.Category;
public class CategoryController : BaseController
{
  public override void MapRoutes(WebApplication app)
  {
    app.MapGroup(this)
      .MapGet(GetCategories)
      .MapPost(CreatedAsync)
      .MapGet(GetCategoryByIdAsync, "{id:guid}")
      .MapPut(UpdateCategoryAsync, "{id:guid}");
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

  public async Task<Results<Ok<CategoryDto>, NotFound>> GetCategoryByIdAsync(ISender sender, Guid id, [FromRoute] GetCategoryByIdQuery query, CancellationToken cancellationToken)
  {
    var category = await sender.Send(query, cancellationToken);

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
}
