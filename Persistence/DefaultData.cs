using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public static class DefaultData
{
    public static async Task SeedAsync(DataContext dbContext)
    {
        if (!await dbContext.TicketStatus.AnyAsync())
        {
            List<TicketStatus> defaultTicketStatuses =
            [
                new TicketStatus { Id = Guid.NewGuid(), Status = "DEFAULT" },
                new TicketStatus { Id = Guid.NewGuid(), Status = "AVAILABLE" },
            ];

            await dbContext.TicketStatus.AddRangeAsync(defaultTicketStatuses);

            await dbContext.SaveChangesAsync();
        }
    }
}
