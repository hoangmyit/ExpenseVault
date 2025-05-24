using EV.Application.Common.Dtos;

namespace EV.Application.Categories.Queries
{
  public record GetCategoryByIdQuery(int Id) : IRequest<CategorySummaryDto>;
}
