namespace EV.Application.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommand : IRequest<bool>
    {
        public int Id { get; set; }
        public Dictionary<string, string> Name { get; set; }
        public Dictionary<string, string> Description { get; set; }
        public string Avatar { get; set; }
        public bool IsDefault { get; set; }
        public int GroupId { get; set; }
    }
}