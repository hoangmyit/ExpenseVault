﻿using System.ComponentModel.DataAnnotations.Schema;

namespace EV.Domain.Common
{
    public class BaseEntity<T> : BaseEntity 
    {
        public T Id { get; set; }
    }
    public abstract class BaseEntity
    {
        private readonly List<BaseEvent> _domainEvent = new List<BaseEvent>();
        [NotMapped]
        public IReadOnlyCollection<BaseEvent> DomainEvent => _domainEvent.AsReadOnly();

        public void AddDomainEvent(BaseEvent domainEvent)
        {
            _domainEvent.Add(domainEvent);
        }

        public void RemoveDomainEvent(BaseEvent domainEvent)
        {
            _domainEvent.Remove(domainEvent);
        }

        public void ClearDomainEvent()
        {
            _domainEvent.Clear();
        }

    }
}
