using EV.Domain.Common;
using MediatR;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace EV.Infrastructure.Data.Interceptors
{
    public class DispatchDomainEventsInterceptor : SaveChangesInterceptor
    {
        private readonly IMediator _mediatR;

        public DispatchDomainEventsInterceptor(IMediator mediatR)
        {
            _mediatR = mediatR;
        }

        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            DispatchEvent(eventData).GetAwaiter().GetResult();
            return base.SavingChanges(eventData, result);
        }

        public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            await DispatchEvent(eventData);
            return await base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        private async Task DispatchEvent(DbContextEventData eventData)
        {
            if (eventData.Context == null)
            {
                return;
            }
            var entities = eventData.Context.ChangeTracker.Entries<BaseEntity<int>>()
                .Where(x => x.Entity.DomainEvent.Any()).Select(x => x.Entity).ToList();
            var domainEvents = entities.SelectMany(x => x.DomainEvent).ToList();
            entities.ForEach(x => x.ClearDomainEvent());
            await Task.WhenAll(domainEvents.Select(async x => await _mediatR.Publish(x)));
        }
    }
}
