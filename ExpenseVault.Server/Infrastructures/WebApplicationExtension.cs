using System.Reflection;

namespace ExpenseVault.Server.Infrastructures
{
    public static class WebApplicationExtension
    {
        public static RouteGroupBuilder MapRouteGroup(this WebApplication app, BaseController controller)
        {
            string name = controller.GetType().Name.Replace("Controller", "");
            string kebabCase = StringExtensions.ToKebabCase(name);
            return app.MapGroup($"/api/{kebabCase}")
                .WithGroupName(kebabCase)
                .WithTags(kebabCase)
                .WithOpenApi();
        }

        public static WebApplication MapEndPoint(this WebApplication app)
        {
            var controllGroupBase = typeof(BaseController);
            var assembly = Assembly.GetExecutingAssembly();

            var endpoints = assembly.GetExportedTypes().Where(t => t.IsSubclassOf(controllGroupBase));

            foreach (var ep in endpoints)
            {
                if (Activator.CreateInstance(ep) is BaseController controller)
                {
                    controller.MapRoutes(app);
                }
            }

            return app;
        }
    }
}
