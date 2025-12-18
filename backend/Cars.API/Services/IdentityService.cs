using System.Text;
using Cars.Domain;
using Cars.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace CarsWebApplication.Services;

public static class IdentityService
{
    public static IServiceCollection AddIdentityServices(
        this IServiceCollection services,
        IConfiguration config
    )
    {
        services
            .AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<DataContext>();

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                "bardzo dlugi tekst bardzo dlugi tekst bardzo dlugi tekst bardzo dlugi tekst bardzo dlugi tekst bardzo dlugi tekst"
            )
        );

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                }
            );

        // Adding the service responsible for creating JWT tokens
        services.AddScoped<TokenService>();

        return services;
    }
}
