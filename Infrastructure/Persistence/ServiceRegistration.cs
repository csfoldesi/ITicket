using Application.Common.Interfaces;
using Infrastructure.Persistence.Interceptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Persistence;

public static class ServiceRegistration
{
    public static IServiceCollection AddPersistenceServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddSingleton(TimeProvider.System);
        services.AddScoped<AuditableEntityInterceptor>();

        services.AddDbContext<DataContext>(
            (serviceProvider, options) =>
                options
                    .UseSqlite(configuration.GetConnectionString("DefaultConnection")!)
                    .AddInterceptors(
                        serviceProvider.GetRequiredService<AuditableEntityInterceptor>()
                    )
        );
        services.AddScoped<IDataContext>(provider => provider.GetRequiredService<DataContext>());

        return services;
    }
}
