using Microsoft.EntityFrameworkCore;
using EV.Domain.Entities;

namespace EV.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Category> Categories { get; }
        DbSet<Account> Accounts { get; }
        DbSet<Budget> Budgets { get; }
        DbSet<CategoryGroup> CategoryGroups { get; }
        DbSet<Expense> Expenses { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
