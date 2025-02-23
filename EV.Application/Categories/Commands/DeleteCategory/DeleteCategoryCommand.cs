namespace EV.Application.Categories.Commands.DeleteCategory
{
  public record DeleteCategoryCommand(Guid Id) : IRequest;
}
