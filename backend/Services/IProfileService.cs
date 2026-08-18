using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IProfileService
{
    Task<Profile> GetAsync();
}
