using Microsoft.EntityFrameworkCore;
using EV.Domain.Entities;

namespace EV.Application.Common.Interface
{
    public interface IApplicationDbContext
    {
        DbSet<Category> Categories { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
