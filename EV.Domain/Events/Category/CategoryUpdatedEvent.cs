using EV.Domain.Common;
using EV.Domain.Entities;

namespace EV.Domain.Events.Categories;

public class CategoryUpdatedEvent : BaseEvent
{
  public Category Item { get; }
  public CategoryUpdatedEvent(Category category)
  {
    Item = category;
  }
}