namespace EV.Application.Categories.Commands;

public record CreateCategoryCommand : IRequest<int>
{
  public string Name { get; set; }
  public string Description { get; set; }
  public string Avatar { get; set; }
  public bool IsDefault { get; set; }
}
