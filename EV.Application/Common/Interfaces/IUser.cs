namespace EV.Application.Common.Interfaces
{
    public interface IUser
    {
        public Guid Id { get; }
        public string UserName { get; }
        public string Email { get; }
    }
}
