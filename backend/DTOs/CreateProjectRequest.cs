using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.DTOs;

public sealed class CreateProjectRequest
{
    [Required, StringLength(120)]
    public string Title { get; set; } = string.Empty;

    [Required, StringLength(120)]
    public string Slug { get; set; } = string.Empty;

    [Required, StringLength(500)]
    public string Summary { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public List<string> Technologies { get; set; } = [];
    public List<string> Features { get; set; } = [];
    public string? Image { get; set; }
    public string? GitHubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public bool Featured { get; set; }
}
