using API.Dto;
using Application.Common;
using Application.Common.Interfaces;
using Domain.Interfaces;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountsController : BaseApiController
{
    private readonly TokenService _tokenService;
    private readonly IIdentityService _identityService;
    private readonly IUser _user;

    public AccountsController(
        TokenService tokenService,
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
                Token = await _tokenService.CreateTokenAsync(user),
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
                Token = await _tokenService.CreateTokenAsync(user),
            };
            return HandleResult(Result<AccountDto>.Success(accountDto));
        }
        else
        {
            return Unauthorized(ApiResponse<AccountDto>.Failure(result.Error));
        }
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var result = await _identityService.GetUserProfileAsync(_user.Id);
        if (result.ResultCode == Application.Common.ResultCode.Success)
        {
            var user = result.Value!;
            var roles = await _identityService.GetUserRolesAsync(user);
            var accountDto = new AccountDto
            {
                Id = user.Id,
                Email = user.Email!,
                Roles = roles,
            };
            return HandleResult(Result<AccountDto>.Success(accountDto));
        }
        else
        {
            return Unauthorized(ApiResponse<AccountDto>.Failure(result.Error));
        }
    }
}
