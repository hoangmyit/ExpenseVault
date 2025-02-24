using EV.Application.Common.Interface;
using EV.Domain.Entities;
using EV.Domain.Events.Categories;

namespace EV.Application.Categories.Commands.UpdateCategory
{
  public class UpdateCategoryCommand : IRequest<bool>
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Avatar { get; set; }
    public bool IsDefault { get; set; }
  }
}