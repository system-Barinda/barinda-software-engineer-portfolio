namespace Portfolio.Api.Models;

public sealed class Profile
{
    public string Name { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? GitHubUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? CvUrl { get; set; }
}
