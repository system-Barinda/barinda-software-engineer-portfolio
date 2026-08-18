using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories;

public interface IProfileRepository
{
    Task<Profile> GetAsync();
}
