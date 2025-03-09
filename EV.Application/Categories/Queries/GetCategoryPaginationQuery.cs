using EV.Application.Common.Models;

namespace EV.Application.Categories.Queries
{
    public class GetCategoryPaginationQuery : IRequest<PaginatedList<CategoryDto>>
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 50;
    }
}
