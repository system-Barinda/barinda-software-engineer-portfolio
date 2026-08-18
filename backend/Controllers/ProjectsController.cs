using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/projects")]
public sealed class ProjectsController(IProjectService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await service.GetAllAsync());

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var project = await service.GetByIdAsync(id);
        return project is null ? NotFound() : Ok(project);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProjectRequest request)
    {
        var project = await service.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateProjectRequest request)
    {
        var project = await service.UpdateAsync(id, request);
        return project is null ? NotFound() : Ok(project);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
        => await service.DeleteAsync(id) ? NoContent() : NotFound();
}
