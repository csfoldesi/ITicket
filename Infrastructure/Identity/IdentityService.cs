using System.Security.Claims;
using Application.Common;
using Application.Common.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public IdentityService(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        TokenService tokenService,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Result<User>> CreateUserAsync(string email, string password)
    {
        var user = new User { UserName = email, Email = email };
        var result = await _userManager.CreateAsync(user, password);

        return result.Succeeded
            ? Result<User>.Success(user)
            : Result<User>.Failure(result.Errors.Select(e => e.Description).First());
    }

    public async Task<Result<User>> GetUserAsync(string email, string password)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);
        if (user == null)
        {
            return Result<User>.Failure("Unauthorized access");
        }
        var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

        return result.Succeeded
            ? Result<User>.Success(user)
            : Result<User>.Failure("Unauthorized access");
    }

    public async Task<Result<User>> GetUserProfileAsync()
    {
        var userId = _httpContextAccessor.HttpContext!.User.FindFirstValue(
            ClaimTypes.NameIdentifier
        );
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null)
        {
            return Result<User>.Failure("Unauthorized access");
        }
        return Result<User>.Success(user);
    }
}
