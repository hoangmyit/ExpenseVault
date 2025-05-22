namespace EV.Domain.Entities
{
    public class Category : BaseAuditableEntity<int>, ISoftDeleteEntity
    {
        private string _name = string.Empty;
        private string _description = string.Empty;

        // Empty constructor for EF Core
        protected Category() { }

        public Category(string name, string description, int groupId)
        {
            Name = name;
            Description = description;
            GroupId = groupId;
        }

        public string Name 
        { 
            get => _name;
            set 
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Category name cannot be empty", nameof(value));
                _name = value; 
            }
        }

        public string Description 
        { 
            get => _description;
            set 
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Category description cannot be empty", nameof(value));
                _description = value; 
            }
        }        public string? Avatar { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDeleted { get; set; }
        public int GroupId { get; set; }
        public virtual CategoryGroup? CategoryGroup { get; set; }

        public void MarkAsDefault()
        {
            IsDefault = true;
        }        public void MarkAsDeleted()
        {
            IsDeleted = true;
        }

        public void UpdateDetails(string name, string description, string? avatar = null)
        {
            Name = name;
            Description = description;
            
            if (avatar != null)
                Avatar = avatar;
        }
    }
}
