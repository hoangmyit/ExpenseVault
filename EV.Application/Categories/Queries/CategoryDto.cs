using AutoMapper;
using EV.Domain.Entities;

namespace EV.Application.Categories.Queries
{
  public class CategoryDto
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Avatar { get; set; }
    public bool IsDefault { get; set; }
    private class MappingProfile : Profile
    {
      public MappingProfile()
      {
        CreateMap<Category, CategoryDto>();
      }
    }
  }
}
