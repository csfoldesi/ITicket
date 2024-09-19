using Microsoft.EntityFrameworkCore;

namespace Persistence;

public static class PersistenceHelper
{
    public static async Task MigrateAsync(DbContext dbContext)
    {
        await dbContext.Database.MigrateAsync();
    }
}
