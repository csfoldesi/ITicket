﻿using Domain;

namespace Application.Common.Interfaces;

public interface ITokenService
{
    public Task<string> CreateAccessTokenAsync(User user);

    public Task<string> CreateRefreshTokenAsync(
        User user,
        CancellationToken cancellationToken = default
    );
    public Task ExtendRefreshTokenAsync(
        string token,
        CancellationToken cancellationToken = default
    );

    public Task<string?> GetUserIdByTokenAsync(
        string token,
        CancellationToken cancellationToken = default
    );

    public Task RevokeRefreshTokenAsync(
        string userId,
        CancellationToken cancellationToken = default
    );
}