using Microsoft.EntityFrameworkCore;
using EV.Domain.Entities;

namespace EV.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Category> Categories { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
