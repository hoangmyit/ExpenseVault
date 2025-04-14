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

// configuration JWT authentication
builder.Services.AddSingleton(provider =>
{
    var appSettingsService = provider.GetRequiredService<IAppSettingsService>();
    var appSettings = appSettingsService.GetAppSettings();
    var publicKey = X509CertificateLoader.LoadCertificateFromFile(appSettings.Jwt.PublicFilePath);
    return new TokenValidationParameters
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

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = builder.Services.BuildServiceProvider().GetRequiredService<TokenValidationParameters>();
    });

    builder.Services.AddControllersWithViews();
var app = builder.Build();

// Add security headers
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'");
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    context.Response.Headers.Append("Referrer-Policy", "no-referrer");
    context.Response.Headers.Append("Permissions-Policy", "geolocation=(), microphone=()");
    await next();
});

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

app.UseExceptionHandler(options => { });

app.MapEndPoint();

app.Run();
