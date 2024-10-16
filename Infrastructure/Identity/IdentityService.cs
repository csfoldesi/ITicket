using Application.Common;
using Application.Common.Interfaces;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public IdentityService(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        RoleManager<IdentityRole> roleManager
    )
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
    }

    public async Task<Result<User>> CreateUserAsync(string email, string password)
    {
        var user = new User { UserName = email, Email = email };
        var result = await _userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            result = await _userManager.AddToRoleAsync(user, Roles.Guest.ToString());
        }

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

    public async Task<Result<User>> GetUserProfileAsync(string? userId)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null)
        {
            return Result<User>.Failure("Unauthorized access");
        }
        return Result<User>.Success(user);
    }

    public async Task<List<string>> GetUserRolesAsync(User user)
    {
        return (List<string>)await _userManager.GetRolesAsync(user);
    }
}
