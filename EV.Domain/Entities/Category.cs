namespace EV.Domain.Entities
{
    public class Category : BaseAuditableEntity<int>, ISoftDeleteEntity
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? Avatar { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDelete { get; set; }
        public int GroupId { get; set; }
        public virtual CategoryGroup CategoryGroup { get; set; }
    }
}
