using EV.Application.Common.Interface;
using EV.Domain.Entities;
using EV.Domain.Events.Categories;

namespace EV.Application.Categories.Commands.UpdateCategory
{
  public class UpdateCategoryCommand : IRequest<bool>
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Avatar { get; set; }
    public bool IsDefault { get; set; }
  }

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

      category.Name = request.Name;
      category.Description = request.Description;
      category.Avatar = request.Avatar;
      category.IsDefault = request.IsDefault;

      category.AddDomainEvent(new CategoryUpdatedEvent(category));
      _context.Categories.Update(category);

      var result = await _context.SaveChangesAsync(cancellationToken);

      return result > 0;
    }
  }
}