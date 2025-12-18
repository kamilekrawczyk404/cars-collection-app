using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Cars.Domain;
using Microsoft.IdentityModel.Tokens;

namespace CarsWebApplication.Services;

public class TokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public string CreateToken(AppUser user)
    {
        // Key will be consisted of list of claims
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
        };

        // Converting the key into a byte array that the encryption algorithm can use
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokeyKey"]));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        // Describe how token should look
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = credentials,
        };

        // Handler of generating the JWT
        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        // Return the final token as a string
        return tokenHandler.WriteToken(token);
    }
}
