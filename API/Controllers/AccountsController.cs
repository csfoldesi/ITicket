using API.Dto;
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

    public AccountsController(TokenService tokenService, IIdentityService identityService, IUser user)
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
            return Ok(
                new AccountDto
                {
                    Id = user.Id,
                    Email = user.Email!,
                    Token = _tokenService.CreateToken(user),
                }
            );
        }
        else
        {
            return BadRequest(result.Error);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var result = await _identityService.GetUserAsync(loginDto.Email, loginDto.Password);

        if (result.ResultCode == Application.Common.ResultCode.Success)
        {
            var user = result.Value!;
            return Ok(
                new AccountDto
                {
                    Id = user.Id,
                    Email = user.Email!,
                    Token = _tokenService.CreateToken(user),
                }
            );
        }
        else
        {
            return Unauthorized(result.Error);
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
            return Ok(new AccountDto { Id = user.Id, Email = user.Email! });
        }
        else
        {
            return Unauthorized(result.Error);
        }
    }
}
