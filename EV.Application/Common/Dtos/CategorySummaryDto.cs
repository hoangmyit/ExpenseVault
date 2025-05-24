using AutoMapper;
using EV.Domain.Entities;

namespace EV.Application.Common.Dtos
{
    public class CategorySummaryDto
    {
        public required int Id { get; set; }
        public required Dictionary<string, string> Name { get; set; }
        public Dictionary<string, string> Description { get; set; }
        public string Avatar { get; set; }
        public required bool IsDefault { get; set; }
        public bool IsDelete { get; set; }
    }
    public class CategoryProfile : Profile
    {
        public CategoryProfile(): base()
        {
            CreateMap<Category, CategorySummaryDto>();
        }
    }
}
