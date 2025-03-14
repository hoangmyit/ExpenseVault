using EV.Domain.Enums;

namespace EV.Domain.Entities
{
    public class CategoryGroup : BaseAuditableEntity<int>
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required TransactionType TransactionType { get; set; }
        public virtual IEnumerable<Category> Categories { get; set; }
    }
}
