using Portfolio.Api.DTOs;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories;

namespace Portfolio.Api.Services;

public sealed class ProjectService(IProjectRepository repository, ILogger<ProjectService> logger) : IProjectService
{
    public async Task<IReadOnlyList<Project>> GetAllAsync()
    {
        var projects = await repository.GetAllAsync();
        return projects.OrderByDescending(x => x.Featured).ThenBy(x => x.Title).ToList();
    }

    public Task<Project?> GetByIdAsync(Guid id) => repository.GetByIdAsync(id);

    public async Task<Project> CreateAsync(CreateProjectRequest request)
    {
        var project = Map(Guid.NewGuid(), request);
        logger.LogInformation("Creating project {ProjectId} with slug {Slug}", project.Id, project.Slug);
        return await repository.AddAsync(project);
    }

    public Task<Project?> UpdateAsync(Guid id, CreateProjectRequest request)
        => repository.UpdateAsync(Map(id, request));

    public async Task<bool> DeleteAsync(Guid id)
    {
        logger.LogInformation("Deleting project {ProjectId}", id);
        return await repository.DeleteAsync(id);
    }

    private static Project Map(Guid id, CreateProjectRequest request) => new()
    {
        Id = id,
        Title = request.Title.Trim(),
        Slug = request.Slug.Trim().ToLowerInvariant(),
        Summary = request.Summary.Trim(),
        Description = request.Description.Trim(),
        Technologies = request.Technologies,
        Features = request.Features,
        Image = request.Image,
        GitHubUrl = request.GitHubUrl,
        LiveUrl = request.LiveUrl,
        Featured = request.Featured
    };
}
