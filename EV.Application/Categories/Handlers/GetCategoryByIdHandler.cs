﻿using AutoMapper;
using EV.Application.Categories.Queries;
using EV.Application.Common.Interfaces;
using EV.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EV.Application.Categories.Handlers
{
    public class GetCategoryByIdHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        

        public GetCategoryByIdHandler(
            IApplicationDbContext context, 
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.AsNoTracking().SingleOrDefaultAsync(x => x.Id == request.Id && !x.IsDelete, cancellationToken);

            Guard.Against.NotFound<Category>($"The category {request.Id} is not found!", category);

            return _mapper.Map<CategoryDto>(category);
        }
    }
}
