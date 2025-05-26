namespace EV.Domain.Entities
{
    public class Expense : BaseAuditableEntity<Guid>, ISoftDeleteEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public decimal Amount { get; set; }
        public bool IsReceive { get; set; }
        public bool IsTransfer { get; set; }
        public bool IsPlan { get; set; }
        public int CategoryId { get; set; }
        public Guid AccountId { get; set; }
        public Guid UserId { get; set; }
        public string Avatar { get; set; }

        public virtual Category Category { get; set; }
        public virtual Account Account { get; set; }
    }
}
