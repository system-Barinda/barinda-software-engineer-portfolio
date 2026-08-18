using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories;

public interface IProjectRepository
{
    Task<IReadOnlyList<Project>> GetAllAsync();
    Task<Project?> GetByIdAsync(Guid id);
    Task<Project> AddAsync(Project project);
    Task<Project?> UpdateAsync(Project project);
    Task<bool> DeleteAsync(Guid id);
}
