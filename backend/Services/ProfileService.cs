using Portfolio.Api.Models;
using Portfolio.Api.Repositories;

namespace Portfolio.Api.Services;

public sealed class ProfileService(IProfileRepository repository) : IProfileService
{
    public Task<Profile> GetAsync() => repository.GetAsync();
}
