using Microsoft.EntityFrameworkCore;

namespace EV.Application.Common.Models
{
    public class PaginatedList<T>
    {
        public IReadOnlyCollection<T> Items { get; }
        public int PageIndex { get; init; } = 0;
        public int TotalPages { get; init; } = 10;
        public int TotalCount { get; init; } = 0;

        public bool HasPreviousPage => PageIndex > 1;

        public bool HasNextPage => PageIndex < TotalPages;

        public PaginatedList(IReadOnlyCollection<T> items, int pageIndex, int pageSize, int totalCount)
        {
            Items = items;
            PageIndex = pageIndex;
            TotalPages = Convert.ToInt16(Math.Ceiling(totalCount * 1.0 / pageSize));
            TotalCount = totalCount;
        }

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PaginatedList<T>(items, pageIndex, pageSize, count);
        }
    }
}
