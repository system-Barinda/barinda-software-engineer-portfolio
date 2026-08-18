using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IResumeService
{
    Task<IReadOnlyList<Skill>> GetSkillsAsync();
    Task<IReadOnlyList<Experience>> GetExperiencesAsync();
}
