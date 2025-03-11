﻿using EV.Application.Identity.Commands;

namespace EV.Application.Common.Interfaces
{
    public interface IAuthService
    {
        Task<string> AuthenticateAsync(string username, string password);
        Task<string> GenerateRefreshTokenAsync(string username);
        Task<RefreshTokenResponse> RefreshTokenAsync(string token, string refreshToken);
        Task<string> RegisterUserAsync(string name, string email, string password);
    }
}
