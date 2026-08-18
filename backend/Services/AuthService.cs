using Microsoft.IdentityModel.Tokens;
using Portfolio.Api.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Portfolio.Api.Services;

public sealed class AuthService(IConfiguration configuration) : IAuthService
{
    public LoginResponse? Login(LoginRequest request)
    {
        var configuredUsername = configuration["Admin:Username"];
        var configuredPassword = configuration["Admin:Password"];

        if (!string.Equals(request.Username, configuredUsername, StringComparison.Ordinal)
            || !string.Equals(request.Password, configuredPassword, StringComparison.Ordinal))
        {
            return null;
        }

        var expires = DateTime.UtcNow.AddHours(8);
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, request.Username),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: credentials);

        return new LoginResponse(new JwtSecurityTokenHandler().WriteToken(token), expires);
    }
}
