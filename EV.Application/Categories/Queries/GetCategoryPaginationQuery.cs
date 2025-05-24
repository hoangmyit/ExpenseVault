using EV.Application.Common.Dtos;
using EV.Application.Common.Models;

namespace EV.Application.Categories.Queries
{
    public class GetCategoryPaginationQuery : IRequest<PaginatedList<CategoryDto>>
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 50;
        public string? Search { get; set; } = string.Empty;
        public string? FilterBy { get; set; } = string.Empty;
        public string? SortBy { get; set; } = string.Empty;
        public bool IsAsc { get; set; } = true;
    }
}
