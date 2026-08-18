using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/profile")]
public sealed class ProfileController(IProfileService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok(await service.GetAsync());
}
