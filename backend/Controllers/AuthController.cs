using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(IAuthService service) : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var response = service.Login(request);

        return response is null
            ? Unauthorized(new { message = "Invalid username or password." })
            : Ok(response);
    }
}
