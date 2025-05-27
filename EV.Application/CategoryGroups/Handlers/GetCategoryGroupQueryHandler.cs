using AutoMapper;
using EV.Application.CategoryGroups.Queries;
using EV.Application.Common.Dtos;
using EV.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EV.Application.CategoryGroups.Handlers
{
    public class GetCategoryGroupQueryHandler : IRequestHandler<GetCategoryGroupQuery, IList<CategoryGroupDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<GetCategoryGroupQueryHandler> _logger;

        public GetCategoryGroupQueryHandler(
            IApplicationDbContext context,
            IMapper mapper,
            ILogger<GetCategoryGroupQueryHandler> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<IList<CategoryGroupDto>> Handle(GetCategoryGroupQuery request, CancellationToken cancellationToken)
        {
            var categoryGroups = await _context.CategoryGroups.AllAsync(x => !x.IsDeleted);

            return _mapper.Map<IList<CategoryGroupDto>>(categoryGroups);
        }
    }
}
