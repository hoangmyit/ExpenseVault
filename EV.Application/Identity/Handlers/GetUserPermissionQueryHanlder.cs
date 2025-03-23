using EV.Application.Common.Interfaces;
using EV.Application.Identity.Queries;

namespace EV.Application.Identity.Handlers
{
    public class GetUserPermissionQueryHanlder : IRequestHandler<GetUserPermissionQuery, IEnumerable<string>>
    {
        private readonly IPermissionService _permissionService;

        public GetUserPermissionQueryHanlder(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        public async Task<IEnumerable<string>> Handle(GetUserPermissionQuery request, CancellationToken cancellationToken)
        {
            return await _permissionService.GetUserPermissionsAsync(request.Id.ToString());
        }
    }
}
