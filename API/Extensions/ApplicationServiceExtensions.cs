namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddAPIServices(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        return services;
    }
}
