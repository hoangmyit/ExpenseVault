using EV.Application;
using EV.Infrastructure;
using EV.Infrastructure.Data;
using ExpenseVault.Server;
using ExpenseVault.Server.Infrastructures;
using Microsoft.AspNetCore.Builder;

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
    await app.InitializeDatabaseAsync();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapEndPoint();

app.Run();
