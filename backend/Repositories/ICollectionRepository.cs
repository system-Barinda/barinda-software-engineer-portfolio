namespace Portfolio.Api.Repositories;

public interface ICollectionRepository<T>
{
    Task<IReadOnlyList<T>> GetAllAsync();
}
