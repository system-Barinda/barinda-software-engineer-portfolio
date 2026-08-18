namespace Portfolio.Api.Models;

public sealed class Experience
{
    public Guid Id { get; set; }
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Achievements { get; set; } = [];
}
