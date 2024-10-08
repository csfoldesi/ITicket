using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Interceptors;

namespace Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistenceServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddSingleton(TimeProvider.System);
        services.AddScoped<AuditableEntityInterceptor>();

        services.AddDbContext<DataContext>((serviceProvider, options) =>
            options
            .UseSqlite(configuration.GetConnectionString("DefaultConnection")!)
            .AddInterceptors(serviceProvider.GetRequiredService<AuditableEntityInterceptor>())
        );

        return services;
    }
}
