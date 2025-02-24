using System.Diagnostics.CodeAnalysis;
using Ardalis.GuardClauses;

namespace ExpenseVault.Server.Infrastructures
{
  public static class IEndpointRouteBuilderExtension
  {
    public static IEndpointRouteBuilder MapRouteGet(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern = "")
    {
      builder.MapGet(pattern, handler)
         .WithName(handler.Method.Name);
          
       return builder;
    }

    public static IEndpointRouteBuilder MapRoutePost(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern = "")
    {
      builder.MapPost(pattern, handler)
         .WithName(handler.Method.Name);

      return builder;
    }

    public static IEndpointRouteBuilder MapRoutePut(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern)
    {
      builder.MapPut(pattern, handler)
         .WithName(handler.Method.Name);

      return builder;
    }

    public static IEndpointRouteBuilder MapRoutePatch(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern)
    {
      builder.MapPatch(pattern, handler)
         .WithName(handler.Method.Name);

      return builder;
    }

    public static IEndpointRouteBuilder MapRouteDelete(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern)
    {
      builder.MapDelete(pattern, handler)
         .WithName(handler.Method.Name);

      return builder;
    }
  }
}
