using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/contact")]
public sealed class ContactController(IContactService service) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateContactMessageRequest request)
    {
        var message = await service.CreateAsync(request);
        return Ok(new
        {
            message = "Your message has been received.",
            id = message.Id
        });
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await service.GetAllAsync());

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
        => await service.DeleteAsync(id) ? NoContent() : NotFound();
}
