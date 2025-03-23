using EV.Application.Common.Interfaces;
using EV.Application.Identity.Queries;

namespace EV.Application.Identity.Handlers
{
    public class GetCurrentUserPermissionQueryHanlder : IRequestHandler<GetCurrentUserPermissionQuery, IEnumerable<string>>
    {
        private readonly IPermissionService _permissionService;
        private readonly IUser _user;

        public GetCurrentUserPermissionQueryHanlder(IPermissionService permissionService, IUser user)
        {
            _permissionService = permissionService;
            _user = user;
        }

        public async Task<IEnumerable<string>> Handle(GetCurrentUserPermissionQuery request, CancellationToken cancellationToken)
        {
            return await _permissionService.GetUserPermissionsAsync(_user.Id.ToString());
        }
    }
}
