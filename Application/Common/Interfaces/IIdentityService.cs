using Domain;

namespace Application.Common.Interfaces;

public interface IIdentityService
{
    Task<Result<User>> CreateUserAsync(string email, string password);

    Task<Result<User>> GetUserAsync(string email, string password);
}
