namespace EV.Domain.Events;

public class CategoryUpdatedEvent : BaseEvent
{
  public Category Item { get; }
  public CategoryUpdatedEvent(Category category)
  {
    Item = category;
  }
}