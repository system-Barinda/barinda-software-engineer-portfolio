using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories;

public sealed class JsonProjectRepository(JsonFileStore store) : IProjectRepository
{
    private const string FileName = "projects.json";

    public async Task<IReadOnlyList<Project>> GetAllAsync()
        => await store.ReadAsync(FileName, new List<Project>());

    public async Task<Project?> GetByIdAsync(Guid id)
        => (await GetAllAsync()).FirstOrDefault(x => x.Id == id);

    public async Task<Project> AddAsync(Project project)
    {
        var projects = (await GetAllAsync()).ToList();
        projects.Add(project);
        await store.WriteAsync(FileName, projects);
        return project;
    }

    public async Task<Project?> UpdateAsync(Project project)
    {
        var projects = (await GetAllAsync()).ToList();
        var index = projects.FindIndex(x => x.Id == project.Id);

        if (index < 0)
            return null;

        projects[index] = project;
        await store.WriteAsync(FileName, projects);
        return project;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var projects = (await GetAllAsync()).ToList();
        var removed = projects.RemoveAll(x => x.Id == id) > 0;

        if (removed)
            await store.WriteAsync(FileName, projects);

        return removed;
    }
}
