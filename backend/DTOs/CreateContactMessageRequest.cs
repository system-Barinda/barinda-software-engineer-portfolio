using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.DTOs;

public sealed class CreateContactMessageRequest
{
    [Required, StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress, StringLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required, StringLength(200)]
    public string Subject { get; set; } = string.Empty;

    [Required, StringLength(5000, MinimumLength = 5)]
    public string Message { get; set; } = string.Empty;
}
