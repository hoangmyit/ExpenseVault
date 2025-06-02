using EV.Domain.Enums;

namespace EV.Application.Common.Dtos
{
    public class CategoryGroupDto
    {
        public int Id { get; set; }
        public Dictionary<string, string> Name { get; set; }
        public Dictionary<string, string> Description { get; set; }
        public TransactionType TransactionType { get; set; }
    }

    public class CategoryGroupDtoProfile : AutoMapper.Profile
    {
        public CategoryGroupDtoProfile()
        {
            CreateMap<Domain.Entities.CategoryGroup, CategoryGroupDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.TransactionType, opt => opt.MapFrom(src => src.TransactionType));
        }
    }
}
