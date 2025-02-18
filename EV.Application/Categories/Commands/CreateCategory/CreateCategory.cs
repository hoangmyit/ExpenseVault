using EV.Domain.Entities;
using EV.Domain.Events.Categories;

namespace EV.Application.Common.Interface;

public record CreateCategoryCommand : IRequest<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Avatar { get; set; }
    public bool IsDefault { get; set; }
}
public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Guid>
{
  private readonly IApplicationDbContext _context;

    public CreateCategoryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        Category category = new()
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            Avatar = request.Avatar,
            IsDefault = request.IsDefault
        };
        category.AddDomainEvent(new CategoryCreatedEvent(category));
        _context.Categories.Add(category);

        await _context.SaveChangesAsync(cancellationToken);

        return category.Id;
    }
}