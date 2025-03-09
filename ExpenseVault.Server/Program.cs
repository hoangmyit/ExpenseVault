using System.Security.Cryptography.X509Certificates;
using EV.Application;
using EV.Application.Common.Interfaces;
using EV.Infrastructure;
using EV.Infrastructure.Data;
using ExpenseVault.Server;
using ExpenseVault.Server.Infrastructures;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.AddApplicationService();
builder.Services.AddInfrastructureServices(configuration);
builder.Services.AddWebServices();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
            builder =>
                builder.WithOrigins("https://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
        );
    });
}

builder.Services.AddControllers();

// Resolve AppSettingsService
var appSettingsService = builder.Services.BuildServiceProvider().GetRequiredService<IAppSettingsService>();
var appSettings = appSettingsService.GetAppSettings();

// configuration JWT authentication
var publicKey = X509CertificateLoader.LoadCertificateFromFile(appSettings.Jwt.PublicFilePath);
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new X509SecurityKey(publicKey),
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = appSettings.Jwt.Issuer,
            ValidAudience = appSettings.Jwt.Audience,
            RequireExpirationTime = true,
        };
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
    // Use the CORS policy
    app.UseCors("AllowSpecificOrigin");
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

// Use authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapEndPoint();

app.Run();
