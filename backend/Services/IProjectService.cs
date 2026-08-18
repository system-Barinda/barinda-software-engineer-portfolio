using Portfolio.Api.DTOs;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IProjectService
{
    Task<IReadOnlyList<Project>> GetAllAsync();
    Task<Project?> GetByIdAsync(Guid id);
    Task<Project> CreateAsync(CreateProjectRequest request);
    Task<Project?> UpdateAsync(Guid id, CreateProjectRequest request);
    Task<bool> DeleteAsync(Guid id);
}
