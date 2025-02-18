namespace EV.Domain.Events;

public class CategoryCreatedEvent : BaseEvent
{
  public Category Item { get; }
  public CategoryCreatedEvent(Category category)
  {
    Item = category;
  }
}