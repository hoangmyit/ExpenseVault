using EV.Application.Common.Dtos;

namespace EV.Application.CategoryGroups.Queries
{
    public record GetCategoryGroupQuery : IRequest<IList<CategoryGroupDto>>;
}
