﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using EV.Application.Categories.Queries;
using EV.Application.Common.Dtos;
using EV.Application.Common.Interfaces;
using EV.Application.Common.Models;
using EV.Application.Mapping;
using Microsoft.EntityFrameworkCore;
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

            var query = _context.Categories.Where(x => !x.IsDeleted);

            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where("(@0).Contains(@1)", request.FilterBy, request.Search);
            }

            if (string.IsNullOrEmpty(request.SortBy))
            {
                query = request.IsAsc ? query.OrderBy(x => x.Id) : query.OrderByDescending(x => x.Id);
            }
            else
            {
                var order = request.IsAsc ? "ascending" : "descending";
                query = query.OrderBy($"{request.SortBy} {order}");
            }

            return await query
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageIndex, request.PageSize);
        }
    }
}
