namespace EV.Application.Identity.Queries
{
    public record GetUserPermissionQuery(Guid Id) : IRequest<IEnumerable<string>>;
}
