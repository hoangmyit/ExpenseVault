using AutoMapper;
using EV.Domain.Entities;
using EV.Domain.Enums;

namespace EV.Application.Common.Dtos
{
    public class CategoryDto : CategorySummaryDto
    {
        public Dictionary<string, string> GroupName { get; set; }
        public TransactionType TransactionType { get; set; }
    }

    public class CategoryDtoProfile : Profile
    {
        public CategoryDtoProfile()
        {
            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.GroupName, opt => opt.MapFrom(src => src.CategoryGroup.Name))
                .ForMember(dest => dest.TransactionType, opt => opt.MapFrom(src => src.CategoryGroup.TransactionType));
        }
    }
}
