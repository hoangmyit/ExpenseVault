using EV.Application.Common.Interfaces;
using EV.Domain.Entities;
using EV.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace EV.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }
        public DbSet<Category> Categories => Set<Category>();

        public DbSet<Account> Accounts => Set<Account>();

        public DbSet<Budget> Budgets => Set<Budget>();

        public DbSet<CategoryGroup> CategoryGroups => Set<CategoryGroup>();

        public DbSet<Expense> Expenses => Set<Expense>();

        public void AttachEntity<TEntity>(TEntity entity) where TEntity : class
        {
            Set<TEntity>().Attach(entity);
        }

        public async Task BeginTransactionAsync()
        {
            await Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            await Database.CommitTransactionAsync();
        }

        public async Task<int> ExecuteSqlRawAsync(string sql, params object[] parameters)
        {
            return await Database.ExecuteSqlRawAsync(sql, parameters);
        }

        public IQueryable<TEntity> GetAsNoTracking<TEntity>() where TEntity : class
        {
            return Set<TEntity>().AsNoTracking();
        }

        public Task RollbackTransactionAsync()
        {
            return Database.RollbackTransactionAsync();
        }

        public void SetEntityState<TEntity>(TEntity entity, EntityState state) where TEntity : class
        {
            Entry(entity).State = state;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
