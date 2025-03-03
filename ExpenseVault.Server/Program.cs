using EV.Application;
using EV.Infrastructure;
using EV.Infrastructure.Data;
using ExpenseVault.Server;
using ExpenseVault.Server.Infrastructures;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
            builder.WithOrigins("https://localhost:5173")
                .AllowAnyMethod()
                .AllowAnyHeader()
    );
});

// Add services to the container.
builder.AddApplicationService();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWebServices();

builder.Services.AddControllers();

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

// Use the CORS policy
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapEndPoint();

app.Run();
