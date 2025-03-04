using System.Diagnostics.CodeAnalysis;
using Ardalis.GuardClauses;

namespace ExpenseVault.Server.Infrastructures
{
    public static class IEndpointRouteBuilderExtension
    {
        public static RouteGroupBuilder MapRouteGet(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern = "",
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            builder.MapGet(pattern, handler)
               .WithName(handler.Method.Name);

            return builder;
        }

        public static RouteGroupBuilder MapRoutePost(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern = "",
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            builder.MapPost(pattern, handler)
               .WithName(handler.Method.Name);

            return builder;
        }

        public static RouteGroupBuilder MapRoutePut(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern,
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            builder.MapPut(pattern, handler)
               .WithName(handler.Method.Name);

            return builder;
        }

        public static RouteGroupBuilder MapRoutePatch(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern,
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            builder.MapPatch(pattern, handler)
               .WithName(handler.Method.Name);

            return builder;
        }

        public static RouteGroupBuilder MapRouteDelete(
            this RouteGroupBuilder builder,
            Delegate handler,
            [StringSyntax("Route")] string pattern,
            bool allowAnonymous = false)
        {
            if (!allowAnonymous)
            {
                Guard.Against.AnonymousMethod(handler);
            }
            builder.MapDelete(pattern, handler)
               .WithName(handler.Method.Name);

            return builder;
        }
    }
}
