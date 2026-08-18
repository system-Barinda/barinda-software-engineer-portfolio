using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories;

public sealed class JsonProfileRepository(JsonFileStore store) : IProfileRepository
{
    private const string FileName = "profile.json";

    public Task<Profile> GetAsync()
        => store.ReadAsync(FileName, new Profile
        {
            Name = "Barinda System Sylvere",
            Headline = "Software Engineer",
            Summary = "I build reliable, maintainable and scalable software.",
            Location = "Rwanda"
        });
}
