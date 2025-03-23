using EV.Application.Common.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace EV.Application.Authorization
{
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly IPermissionService _permissionService;
        private readonly IUser _user;

        public PermissionHandler(IPermissionService permissionService, IUser user)
        {
            _permissionService = permissionService;
            _user = user;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if (_user.Id != Guid.Empty && await _permissionService.HasPermissionAsync(_user.Id.ToString(), requirement.Permission))
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }
        }
    }
}
