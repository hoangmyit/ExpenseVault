using EV.Application.Common.Model;

namespace EV.Application.Categories.Queries
{
  public class GetCategoryPaginationQuery : IRequest<PaginatedList<CategoryDto>>
  {
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
  }
}
