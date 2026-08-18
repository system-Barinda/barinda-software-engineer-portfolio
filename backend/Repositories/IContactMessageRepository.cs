using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories;

public interface IContactMessageRepository
{
    Task<IReadOnlyList<ContactMessage>> GetAllAsync();
    Task<ContactMessage> AddAsync(ContactMessage message);
    Task<bool> DeleteAsync(Guid id);
}
