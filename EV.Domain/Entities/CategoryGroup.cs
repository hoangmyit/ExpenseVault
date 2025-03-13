namespace EV.Domain.Entities
{
    public class CategoryGroup : BaseAuditableEntity<int>
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
    }
}
