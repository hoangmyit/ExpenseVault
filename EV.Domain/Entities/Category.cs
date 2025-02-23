namespace EV.Domain.Entities
{
    public class Category : BaseAuditableEntity, ISoftDeleteEntity
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? Avatar { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDelete { get; set; }
    }
}
