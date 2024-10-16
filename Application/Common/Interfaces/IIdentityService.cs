using Domain;

namespace Application.Common.Interfaces;

public interface IIdentityService
{
    Task<Result<User>> CreateUserAsync(string email, string password);

    Task<Result<User>> GetUserAsync(string email, string password);

    Task<Result<User>> GetUserProfileAsync(string? userId);

    Task<List<string>> GetUserRolesAsync(User user);
}
