using Portfolio.Api.DTOs;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories;
using Portfolio.Api.Services;

namespace Portfolio.Api.Tests;

public sealed class ProjectServiceTests
{
    [Fact]
    public async Task CreateAsync_creates_project_with_generated_id_and_normalized_slug()
    {
        var repository = new FakeProjectRepository();
        var service = new ProjectService(repository, new TestLogger<ProjectService>());

        var result = await service.CreateAsync(new CreateProjectRequest
        {
            Title = "My Project",
            Slug = "MY-PROJECT",
            Summary = "A project",
            Description = "A detailed project."
        });

        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal("my-project", result.Slug);
        Assert.Single(repository.Items);
    }

    private sealed class FakeProjectRepository : IProjectRepository
    {
        public List<Project> Items { get; } = [];

        public Task<IReadOnlyList<Project>> GetAllAsync()
            => Task.FromResult<IReadOnlyList<Project>>(Items);

        public Task<Project?> GetByIdAsync(Guid id)
            => Task.FromResult(Items.FirstOrDefault(x => x.Id == id));

        public Task<Project> AddAsync(Project project)
        {
            Items.Add(project);
            return Task.FromResult(project);
        }

        public Task<Project?> UpdateAsync(Project project)
        {
            var index = Items.FindIndex(x => x.Id == project.Id);
            if (index < 0) return Task.FromResult<Project?>(null);
            Items[index] = project;
            return Task.FromResult<Project?>(project);
        }

        public Task<bool> DeleteAsync(Guid id)
            => Task.FromResult(Items.RemoveAll(x => x.Id == id) > 0);
    }

    private sealed class TestLogger<T> : ILogger<T>
    {
        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;
        public bool IsEnabled(LogLevel logLevel) => false;
        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state,
            Exception? exception, Func<TState, Exception?, string> formatter) { }
    }
}
