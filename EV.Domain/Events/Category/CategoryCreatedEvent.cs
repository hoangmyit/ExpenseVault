using EV.Domain.Common;
using EV.Domain.Entities;

namespace EV.Domain.Events.Categories;

public class CategoryCreatedEvent : BaseEvent
{
  public Category Item { get; }
  public CategoryCreatedEvent(Category category)
  {
    Item = category;
  }
}