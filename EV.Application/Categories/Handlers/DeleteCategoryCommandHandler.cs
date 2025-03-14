using EV.Application.Categories.Commands.DeleteCategory;
using EV.Application.Common.Interfaces;
using EV.Domain.Entities;
using EV.Domain.Events;
using Microsoft.EntityFrameworkCore;

namespace EV.Application.Categories.Handlers
{
  public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand>
  {
    private readonly IApplicationDbContext _context;

    public DeleteCategoryCommandHandler(IApplicationDbContext context)
    {
      _context = context;
           
    }

    public async Task Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
      var category = await _context.Categories.SingleOrDefaultAsync(x => x.Id == request.Id);

      Guard.Against.NotFound<Category>($"The category {request.Id} is not found!", category);

      category.IsDelete = true;
      category.AddDomainEvent(new CategoryUpdatedEvent(category));

      _context.Categories.Update(category);

      await _context.SaveChangesAsync(cancellationToken);
    }
  }
}
