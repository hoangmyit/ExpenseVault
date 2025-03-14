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
        int SaveChanges();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
        Task<int> ExecuteSqlRawAsync(string sql, params object[] parameters);
        void SetEntityState<TEntity>(TEntity entity, EntityState state) where TEntity : class;
        void AttachEntity<TEntity>(TEntity entity) where TEntity : class;
        IQueryable<TEntity> GetAsNoTracking<TEntity>() where TEntity : class;
    }
}
