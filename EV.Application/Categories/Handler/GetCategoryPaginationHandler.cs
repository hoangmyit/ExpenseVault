using AutoMapper;
using AutoMapper.QueryableExtensions;
using EV.Application.Categories.Queries;
using EV.Application.Common.Interface;
using EV.Application.Common.Model;
using EV.Application.Mapping;

namespace EV.Application.Categories.Handler
{
  public class GetCategoryPaginationHandler : IRequestHandler<GetCategoryPaginationQuery, PaginatedList<CategoryDto>>
  {
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetCategoryPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }
    public async Task<PaginatedList<CategoryDto>> Handle(GetCategoryPaginationQuery request, CancellationToken cancellationToken)
    {
      return await _context.Categories
        .Where(x => !x.IsDelete)
        .OrderBy(x => x.Name)
        .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
        .PaginatedListAsync(request.PageIndex, request.PageSize);
    }
  }
}
