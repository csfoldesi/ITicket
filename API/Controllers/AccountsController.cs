using API.Dto;
using Application.Common;
using Application.Common.Interfaces;
using Domain;
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
            var accountDto = await CreateAccountDtoFromUser(result.Value!);
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
            var accountDto = await CreateAccountDtoFromUser(result.Value!);
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
            var profileDto = new ProfileDto
            {
                Email = user.Email!,
                Roles = await _identityService.GetUserRolesAsync(user),
            };
            return HandleResult(Result<ProfileDto>.Success(profileDto));
        }
        else
        {
            return Unauthorized(ApiResponse<ProfileDto>.Failure(result.Error));
        }
    }

    [HttpPost("token/{refreshToken}")]
    public async Task<IActionResult> RefreshToken(string refreshToken)
    {
        var userId = await _tokenService.GetUserIdByTokenAsync(refreshToken);
        if (userId == null)
        {
            return Unauthorized(ApiResponse<AccountDto>.Failure("Invalid token"));
        }

        var result = await _identityService.GetUserProfileAsync(userId);
        if (result.ResultCode == Application.Common.ResultCode.Success)
        {
            await _tokenService.ExtendRefreshTokenAsync(refreshToken);
            var accountDto = await CreateAccountDtoFromUser(result.Value!, refreshToken);
            return HandleResult(Result<AccountDto>.Success(accountDto));
        }
        else
        {
            return Unauthorized(ApiResponse<AccountDto>.Failure(result.Error));
        }
    }

    private async Task<AccountDto> CreateAccountDtoFromUser(User user, string? refreshToken = null)
    {
        var accountDto = new AccountDto
        {
            Id = user.Id,
            Email = user.Email!,
            AccessToken = await _tokenService.CreateAccessTokenAsync(user),
            RefreshToken = refreshToken ?? await _tokenService.CreateRefreshTokenAsync(user),
            Roles = await _identityService.GetUserRolesAsync(user),
        };
        return accountDto;
    }
}
