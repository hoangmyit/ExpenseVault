namespace EV.Domain.Entities
{
    public class TableLanguage : BaseAuditableEntity<int>, ISoftDeleteEntity
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required IDictionary<string, IDictionary<string, string>> SupportContent { get; set; }
        public bool IsDelete { get; set; } = false;
    }
}
