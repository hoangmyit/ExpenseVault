   using Microsoft.AspNetCore.Authorization;

   namespace EV.Application.Authorization
   {
       public class PermissionRequirement : IAuthorizationRequirement
       {
           public string Permission { get; }

           public PermissionRequirement(string permission)
           {
               Permission = permission;
           }
       }
   }
   