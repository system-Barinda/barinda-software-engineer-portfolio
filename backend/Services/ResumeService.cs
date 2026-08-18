using Portfolio.Api.Models;
using Portfolio.Api.Repositories;

namespace Portfolio.Api.Services;

public sealed class ResumeService(
    ICollectionRepository<Skill> skills,
    ICollectionRepository<Experience> experiences) : IResumeService
{
    public Task<IReadOnlyList<Skill>> GetSkillsAsync() => skills.GetAllAsync();
    public Task<IReadOnlyList<Experience>> GetExperiencesAsync() => experiences.GetAllAsync();
}
