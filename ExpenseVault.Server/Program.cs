using EV.Application;
using EV.Infrastructure;
using ExpenseVault.Server;
using ExpenseVault.Server.Infrastructures;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddApplicationService();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWebServices();

builder.Services.AddControllers();

builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "v2";
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapEndPoint();

app.Run();
