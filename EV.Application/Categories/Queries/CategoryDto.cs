using AutoMapper;
using EV.Domain.Entities;

namespace EV.Application.Categories.Queries
{
    public class CategoryDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; }
        public string Avatar { get; set; }
        public required bool IsDefault { get; set; }

    }
    public class CategoryProfile : Profile
    {
        public CategoryProfile(): base()
        {
            CreateMap<Category, CategoryDto>();
        }
    }
}
