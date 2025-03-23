using System.Diagnostics.CodeAnalysis;
using Ardalis.GuardClauses;

namespace ExpenseVault.Server.Infrastructures
{
    public static class IEndpointRouteBuilderExtension
    {
        public static RouteHandlerBuilder MapRouteGet(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern = "",
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            return builder.MapGet(pattern, handler)
               .WithName(handler.Method.Name);
        }

        public static RouteHandlerBuilder MapRoutePost(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern = "",
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            return builder.MapPost(pattern, handler)
               .WithName(handler.Method.Name);
        }

        public static RouteHandlerBuilder MapRoutePut(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern,
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            return builder.MapPut(pattern, handler)
               .WithName(handler.Method.Name);
        }

        public static RouteHandlerBuilder MapRoutePatch(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern,
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            return builder.MapPatch(pattern, handler)
               .WithName(handler.Method.Name);
        }

        public static RouteHandlerBuilder MapRouteDelete(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern,
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            return builder.MapDelete(pattern, handler)
               .WithName(handler.Method.Name);
        }
    }
}
