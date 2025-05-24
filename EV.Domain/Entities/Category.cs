namespace EV.Domain.Entities
{
    public class Category : BaseAuditableEntity<int>, ISoftDeleteEntity
    {
        public required Dictionary<string, string> Name { get; set; }
        public required Dictionary<string, string> Description { get; set; }
        public string? Avatar { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDelete { get; set; }
        public int GroupId { get; set; }
        public virtual CategoryGroup CategoryGroup { get; set; }
        public string GetName(string languageCode) => Name.TryGetValue(languageCode, out var value) ? value : Name["en"];
        public string GetDescription(string languageCode) => Description.TryGetValue(languageCode, out var value) ? value : Description["en"];
    }
}
