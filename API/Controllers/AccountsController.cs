using API.Dto;
using Application.Common;
using Application.Common.Interfaces;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountsController : BaseApiController
{
    private readonly ITokenService _tokenService;
    private readonly IIdentityService _identityService;
    private readonly IUser _user;

    public AccountsController(
        ITokenService tokenService,
        IIdentityService identityService,
        IUser user
    )
    {
        _tokenService = tokenService;
        _identityService = identityService;
        _user = user;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Create(CreateAccountDto createAccount)
    {
        var result = await _identityService.CreateUserAsync(
            createAccount.Email,
            createAccount.Password
        );
        if (result.ResultCode == Application.Common.ResultCode.Success)
        {
            var user = result.Value!;
            var accountDto = new AccountDto
            {
                Id = user.Id,
                Email = user.Email!,
                AccessToken = await _tokenService.CreateAccessTokenAsync(user),
                RefreshToken = await _tokenService.CreateRefreshTokenAsync(user),
                Roles = await _identityService.GetUserRolesAsync(user),
            };
            return HandleResult(Result<AccountDto>.Success(accountDto));
        }
        else
        {
            return HandleResult(Result<AccountDto>.Failure(result.Error));
        }
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var result = await _identityService.GetUserAsync(loginDto.Email, loginDto.Password);

        if (result.ResultCode == Application.Common.ResultCode.Success)
        {
            var user = result.Value!;
            var accountDto = new AccountDto
            {
                Id = user.Id,
                Email = user.Email!,
                AccessToken = await _tokenService.CreateAccessTokenAsync(user),
                RefreshToken = await _tokenService.CreateRefreshTokenAsync(user),
                Roles = await _identityService.GetUserRolesAsync(user),
            };
            return HandleResult(Result<AccountDto>.Success(accountDto));
        }
        else
        {
            return Unauthorized(ApiResponse<AccountDto>.Failure(result.Error));
        }
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _tokenService.RevokeRefreshTokenAsync(_user.Id!);
        return HandleResult(Result<string>.Success("Successful logout"));
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var result = await _identityService.GetUserProfileAsync(_user.Id);
        if (result.ResultCode == Application.Common.ResultCode.Success)
        {
            var user = result.Value!;
            var accountDto = new AccountDto
            {
                Id = user.Id,
                Email = user.Email!,
                Roles = await _identityService.GetUserRolesAsync(user),
                AccessToken = string.Empty,
                RefreshToken = string.Empty,
            };
            return HandleResult(Result<AccountDto>.Success(accountDto));
        }
        else
        {
            return Unauthorized(ApiResponse<AccountDto>.Failure(result.Error));
        }
    }

    [HttpPost("token/{token}")]
    public async Task<IActionResult> RefreshToken(string token)
    {
        var userId = await _tokenService.GetUserIdByTokenAsync(token);
        if (userId == null)
        {
            return Unauthorized(ApiResponse<AccountDto>.Failure("Invalid token"));
        }

        await _tokenService.ExtendRefreshTokenAsync(token);
        var result = await _identityService.GetUserProfileAsync(userId);
        if (result.ResultCode == Application.Common.ResultCode.Success)
        {
            var user = result.Value!;
            var accountDto = new AccountDto
            {
                Id = user.Id,
                Email = user.Email!,
                AccessToken = await _tokenService.CreateAccessTokenAsync(user),
                RefreshToken = token,
                Roles = await _identityService.GetUserRolesAsync(user),
            };
            return HandleResult(Result<AccountDto>.Success(accountDto));
        }
        else
        {
            return Unauthorized(ApiResponse<AccountDto>.Failure(result.Error));
        }
    }
}
