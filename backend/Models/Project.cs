namespace Portfolio.Api.Models;

public sealed class Project
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = [];
    public List<string> Features { get; set; } = [];
    public string? Image { get; set; }
    public string? GitHubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public bool Featured { get; set; }
}
