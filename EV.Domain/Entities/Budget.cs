namespace EV.Domain.Entities
{
    public class Budget : BaseAuditableEntity<Guid>
    {
        public Guid UserId { get; set; }
        public int CategoryId { get; set; }
        public decimal BudgetLimit { get; set; }
        public virtual required Category Category { get; set; }
    }
}
