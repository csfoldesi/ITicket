using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IDataContext
{
    public DbSet<Address> Addresses { get; set; }

    public DbSet<Venue> Venues { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<Ticket> Tickets { get; set; }

    public DbSet<TicketStatus> TicketStatus { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
