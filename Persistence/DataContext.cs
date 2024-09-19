using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Address> Addresses { get; set; }

    public DbSet<Venue> Venues { get; set; }

    public DbSet<Event> Events { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Venue>().OwnsOne(x => x.Address);
    }
}
