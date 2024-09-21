using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection")!);
        });

        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(Application.Venues.Create).Assembly)
        );

        services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);

        return services;
    }
}
