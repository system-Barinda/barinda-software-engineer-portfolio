namespace Portfolio.Api.Models;

public sealed class Skill
{
    public string Category { get; set; } = string.Empty;
    public List<string> Items { get; set; } = [];
}
