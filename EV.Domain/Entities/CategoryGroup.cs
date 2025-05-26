using EV.Domain.Enums;

namespace EV.Domain.Entities
{
    public class CategoryGroup : BaseAuditableEntity<int>
    {
        public required Dictionary<string, string> Name { get; set; }
        public required Dictionary<string, string> Description { get; set; }
        public required TransactionType TransactionType { get; set; }
        public virtual IEnumerable<Category> Categories { get; set; }
        
        public string GetName(string languageCode) => Name.TryGetValue(languageCode, out var value) ? value : Name["en"];
        public string GetDescription(string languageCode) => Description.TryGetValue(languageCode, out var value) ? value : Description["en"];
    }
}
