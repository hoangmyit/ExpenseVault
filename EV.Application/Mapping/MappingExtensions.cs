using AutoMapper;
using AutoMapper.QueryableExtensions;
using EV.Application.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace EV.Application.Mapping
{
    public static class MappingExtensions
    {
        public static Task<PaginatedList<TDestination>> PaginatedListAsync<TDestination>(this IQueryable<TDestination> queryable, int pageIndex, int pageSize) where TDestination : class
          => PaginatedList<TDestination>.CreateAsync(queryable.AsNoTracking(), pageIndex, pageSize);

        public static Task<List<TDestination>> ProjectToListAsyn<TDestination>(this IQueryable queryable, IConfigurationProvider configurationProvider) where TDestination : class
          => queryable.ProjectTo<TDestination>(configurationProvider).AsNoTracking().ToListAsync();
    }
}
