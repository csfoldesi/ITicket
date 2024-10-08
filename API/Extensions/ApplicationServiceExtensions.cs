using System.Text;
using API.Services;
using Domain;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddAPIServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddScoped<IUser, CurrentUser>();
        services.AddHttpContextAccessor();

        services.AddCors(options =>
        {
            options.AddPolicy(
                "CorsPolicy",
                policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins(
                            [.. configuration.GetSection("AllowedOrigins")!.Get<List<string>>()]
                        );
                }
            );
        });

        return services;
    }

    public static IServiceCollection AddIdentityServices(this IServiceCollection services)
    {
        services
            .AddIdentityCore<User>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<User>>();

        var key =
            Environment.GetEnvironmentVariable("JWT_KEY")
            ?? throw new ApplicationException("JWT key is not configured.");
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = securityKey,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            });

        services.AddAuthorization();

        return services;
    }
}
