namespace EV.Domain.Common
{
    public interface ISoftDeleteEntity
    {
        public bool IsDelete { get; set; }
    }
}
