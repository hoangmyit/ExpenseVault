using EV.Application.Categories.Commands;
using EV.Application.Categories.Queries;
using EV.Application.Common.Interface;
using EV.Domain.Entities;
using EV.Domain.Events;

namespace EV.Application.Categories.Handlers
{
    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Guid>
    {
        private readonly IApplicationDbContext _context;
        private readonly IValidator<CreateCategoryCommand> _validator;

        public CreateCategoryCommandHandler(IApplicationDbContext context, IValidator<CreateCategoryCommand> validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<Guid> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            _validator.Validate(request);

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
}
