using EV.Domain.Enums;

namespace EV.Domain.Entities
{
    public class Account : BaseAuditableEntity<Guid>, ISoftDeleteEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Avatar { get; set; }
        public decimal CreditLimit { get; set; }
        public decimal Balance { get; set; }
        public DateTimeOffset PaymentDueDate { get; set; }
        public Guid UserId { get; set; }
        public int Order { get; set; }
        public bool IsDefault { get; set; }
        public AccountType AccountType { get; set; }
        public bool IsDeleted { get; set; }
        public virtual required IEnumerable<Expense> Expenses { get; set; }
    }
}
