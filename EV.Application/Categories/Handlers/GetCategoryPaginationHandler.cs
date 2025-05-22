using AutoMapper;
using AutoMapper.QueryableExtensions;
using EV.Application.Categories.Queries;
using EV.Application.Common.Interfaces;
using EV.Application.Common.Models;
using EV.Application.Mapping;
using System.Linq.Dynamic.Core;

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

            var query = _context.Categories.Where(x => !x.IsDelete);


            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(x => x.Name.Contains(request.Search) || x.Description.Contains(request.Search));
            }
            if (string.IsNullOrEmpty(request.OrderBy))
            {
                query = query.OrderBy(x => x.Id);
            }
            else
            {
                query = query.OrderBy(request.OrderBy);
            }

            return await query
              .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
              .PaginatedListAsync(request.PageIndex, request.PageSize);
        }
    }
}
