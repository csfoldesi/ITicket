using Application.Common.Interfaces;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class DataContext : IdentityDbContext<User>, IDataContext
{
    public DbSet<Address> Addresses { get; set; }

    public DbSet<Venue> Venues { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<Ticket> Tickets { get; set; }

    public DbSet<TicketStatus> TicketStatus { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }

    //public DataContext() { }

    public DataContext(DbContextOptions options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Venue>().OwnsOne(x => x.Address);
        builder.Entity<Event>().HasMany(e => e.Tickets).WithOne(t => t.Event);
    }
}
