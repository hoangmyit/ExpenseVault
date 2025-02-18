using ExpenseVault.Server.Infrastructures;
using MediatR;
using EV.Application.Common.Interface;

namespace ExpenseVault.Server.Controllers.Category;
public class CategoryController : BaseController
{
  public override void MapRoutes(WebApplication app)
  {
    app.MapGroup(this)
      .MapGet(GetCategories);
  }
  public async Task<IResult> GetCategories(ISender sender, CreateCategoryCommand createCategoryCommand ,CancellationToken cancellationToken)
  {
    var result = await sender.Send(createCategoryCommand);
    return Results.Ok(result);
  }

}