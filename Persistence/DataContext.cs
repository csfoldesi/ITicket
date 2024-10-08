using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<User>
{
    public DbSet<Address> Addresses { get; set; }

    public DbSet<Venue> Venues { get; set; }

    public DbSet<Event> Events { get; set; }

    //public DataContext() { }

    public DataContext(DbContextOptions options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Venue>().OwnsOne(x => x.Address);
    }
}
