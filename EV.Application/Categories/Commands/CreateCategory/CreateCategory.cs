namespace EV.Application.Categories.Commands;

public record CreateCategoryCommand : IRequest<int>
{
  public Dictionary<string, string> Name { get; set; }
  public Dictionary<string, string> Description { get; set; }
  public string Avatar { get; set; }
  public bool IsDefault { get; set; }
}
