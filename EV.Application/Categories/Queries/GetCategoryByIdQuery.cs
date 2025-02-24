namespace EV.Application.Categories.Queries
{
  public record GetCategoryByIdQuery(Guid Id) : IRequest<CategoryDto>;
}
