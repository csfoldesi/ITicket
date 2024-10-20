using System.Text;
using Application.Common.Interfaces;
using Domain;
using Infrastructure.Identity;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services
            .AddIdentityCore<User>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
            })
            .AddRoles<IdentityRole>()
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

        services.AddAuthorization(options =>
        {
            options.AddPolicy(
                "IsVenueOwner",
                policy => policy.Requirements.Add(new IsVenueOwnerRequirement())
            );
            options.AddPolicy(
                "IsEventOwner",
                policy => policy.Requirements.Add(new IsEventOwnerRequirement())
            );
        });
        services.AddScoped<TokenService>();
        services.AddTransient<IIdentityService, IdentityService>();
        services.AddScoped<IAuthorizationHandler, IsVenueOwnerHandler>();
        services.AddScoped<IAuthorizationHandler, IsEventOwnerHandler>();

        return services;
    }
}
