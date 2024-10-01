using API.Dto;
using Application.Common.Interfaces;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountsController : BaseApiController
{
    private readonly TokenService _tokenService;
    private readonly IIdentityService _identityService;

    public AccountsController(TokenService tokenService, IIdentityService identityService)
    {
        _tokenService = tokenService;
        _identityService = identityService;
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
                    UserName = user.UserName!,
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
                    UserName = user.UserName!,
                    Token = _tokenService.CreateToken(user),
                }
            );
        }
        else
        {
            return Unauthorized(result.Error);
        }
    }
}
