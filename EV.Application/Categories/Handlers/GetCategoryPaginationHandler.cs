using AutoMapper;
using AutoMapper.QueryableExtensions;
using EV.Application.Categories.Queries;
using EV.Application.Common.Interface;
using EV.Application.Common.Model;
using EV.Application.Mapping;

namespace EV.Application.Categories.Handlers
{
    public class GetCategoryPaginationHandler : IRequestHandler<GetCategoryPaginationQuery, PaginatedList<CategoryDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IValidator<GetCategoryPaginationQuery> _validator;
        public GetCategoryPaginationHandler(IApplicationDbContext context, IMapper mapper, IValidator<GetCategoryPaginationQuery> validator)
        {
            _context = context;
            _mapper = mapper;
            _validator = validator;
        }
        public async Task<PaginatedList<CategoryDto>> Handle(GetCategoryPaginationQuery request, CancellationToken cancellationToken)
        {
            _validator.Validate(request);

            return await _context.Categories
              .Where(x => !x.IsDelete)
              .OrderBy(x => x.Name)
              .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
              .PaginatedListAsync(request.PageIndex, request.PageSize);
        }
    }
}
