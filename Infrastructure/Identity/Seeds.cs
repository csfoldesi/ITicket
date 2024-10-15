using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public static class Seeds
{
    public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        foreach (var role in Enum.GetValues(typeof(Roles)))
        {
            if (!await roleManager.RoleExistsAsync(role.ToString()!))
            {
                await roleManager.CreateAsync(new IdentityRole(role.ToString()!));
            }
        }
    }
}
