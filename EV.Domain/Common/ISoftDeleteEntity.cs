namespace EV.Domain.Common
{
    /// <summary>
    /// Interface for entities that support soft deletion
    /// </summary>
    public interface ISoftDeleteEntity
    {
        /// <summary>
        /// Gets or sets a value indicating whether this entity is soft-deleted
        /// </summary>
        bool IsDeleted { get; set; }
    }
}
