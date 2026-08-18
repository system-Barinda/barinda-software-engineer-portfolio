namespace Portfolio.Api.Repositories;

public sealed class JsonCollectionRepository<T>(JsonFileStore store, string fileName, IReadOnlyList<T> fallback)
    : ICollectionRepository<T>
{
    public Task<IReadOnlyList<T>> GetAllAsync()
        => store.ReadAsync(fileName, fallback);
}
