using EV.Application.Common.Interfaces;
using EV.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace EV.Infrastructure.Data.Interceptors
{
  public class AuditableEntityInterceptor : SaveChangesInterceptor
  {
    private readonly IUser _user;
    private readonly TimeProvider _timeProvider;

    public AuditableEntityInterceptor(IUser user, TimeProvider timeProvider)
    {
      _user = user;
      _timeProvider = timeProvider;
    }

    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
      UpdateEntity(eventData);

      return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
      UpdateEntity(eventData);
      return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void UpdateEntity(DbContextEventData eventData)
    {
      var context = eventData.Context;

      if (context == null)
      {
        return;
      }

      foreach (var entity in context.ChangeTracker.Entries<BaseAuditableEntity<Guid>>())
      {
        if (entity.State is EntityState.Added or EntityState.Modified || entity.IsOwnEntity())
        {
          var utc = _timeProvider.GetUtcNow();
          if (entity.State == EntityState.Added)
          {
            entity.Entity.CreatedBy = _user.Id;
            entity.Entity.Created = utc;
          }
          entity.Entity.LastModified = utc;
          entity.Entity.LastModifiedBy = _user.Id;
        }
      }
    }
  }
}

public static class Extension
{
  public static bool IsOwnEntity(this EntityEntry entity)
  {
    return entity.References
        .Any(x => x.EntityEntry != null
        && x.EntityEntry.Metadata.IsOwned()
        && (x.EntityEntry.State is EntityState.Added or EntityState.Modified)
    );
  }
}
