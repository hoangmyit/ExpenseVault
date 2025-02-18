using System.Diagnostics.CodeAnalysis;
using Ardalis.GuardClauses;

namespace ExpenseVault.Server.Infrastructures
{
  public static class IEndpointRouteBuilderExtension
  {
    public static IEndpointRouteBuilder MapGet(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern = "")
    {
      builder.MapGet(pattern, handler)
         .WithName(handler.Method.Name);
          
       return builder;
    }
  }
}
