﻿using EV.Application.Identity.Commands;
using EV.Application.Identity.Commands.Login;
using EV.Application.Identity.Commands.RegisterUser;
using ExpenseVault.Server.Infrastructures;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseVault.Server.Controllers.Authen;

public class AuthController : BaseController
{
    public override void MapRoutes(WebApplication app)
    {
        var builder = app.MapRouteGroup(this)
        .RequireAuthorization();

        builder.MapRoutePost(LoginAsync, "login").AllowAnonymous();
        builder.MapRoutePost(RefreshTokenAsync, "refresh-token").AllowAnonymous();
        builder.MapRoutePost(RegisterUserAsync, "register").AllowAnonymous();
    }

    public async Task<Ok<LoginResponse>> LoginAsync(ISender sender, [FromBody] LoginCommand command, CancellationToken cancellationToken)
    {
        var response = await sender.Send(command, cancellationToken);
        return TypedResults.Ok(response);
    }

    public async Task<Ok<RefreshTokenResponse>> RefreshTokenAsync(ISender sender, [FromBody] RefreshTokenCommand command, CancellationToken cancellationToken)
    {
        var response = await sender.Send(command, cancellationToken);
        return TypedResults.Ok(response);
    }

    public async Task<Ok<string>> RegisterUserAsync(ISender sender, [FromBody] RegisterUserCommand command, CancellationToken cancellationToken)
    {
        var response = await sender.Send(command, cancellationToken);
        return TypedResults.Ok(response);
    }
}
