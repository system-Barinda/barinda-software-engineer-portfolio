using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api")]
public sealed class ResumeController(IResumeService service) : ControllerBase
{
    [HttpGet("skills")]
    public async Task<IActionResult> GetSkills()
        => Ok(await service.GetSkillsAsync());

    [HttpGet("experiences")]
    public async Task<IActionResult> GetExperiences()
        => Ok(await service.GetExperiencesAsync());
}
