namespace EV.Application.Identity.Queries
{
    public record GetCurrentUserPermissionQuery : IRequest<IEnumerable<string>>;
}
