using EV.Application.Categories.Commands.UpdateCategory;
using EV.Application.Common.Interfaces;
using EV.Domain.Entities;
using EV.Domain.Events;
using Microsoft.EntityFrameworkCore;

namespace EV.Application.Categories.Handlers
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public UpdateCategoryCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.FindAsync(request.Id);
            if (category == null)
            {
                throw new Exception(nameof(Category));
            }

            await _context.BeginTransactionAsync();
            category.Name = request.Name!;
            category.Description = request.Description!;
            category.Avatar = request.Avatar;
            category.GroupId = request.GroupId;

            if (request.IsDefault && !category.IsDefault)
            {
                var defaultCategories = await _context.Categories.Where(c => c.IsDefault).ToListAsync(cancellationToken);
                foreach (var defaultCategory in defaultCategories)
                {
                    defaultCategory.IsDefault = false;
                }
                _context.Categories.UpdateRange(defaultCategories);
            }

            category.IsDefault = request.IsDefault;
            category.AddDomainEvent(new CategoryUpdatedEvent(category));
            _context.Categories.Update(category);

            var result = await _context.SaveChangesAsync(cancellationToken);
            await _context.CommitTransactionAsync();

            return result > 0;
        }
    }
}
