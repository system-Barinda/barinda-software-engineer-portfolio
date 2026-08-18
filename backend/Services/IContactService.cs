using Portfolio.Api.DTOs;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IContactService
{
    Task<ContactMessage> CreateAsync(CreateContactMessageRequest request);
    Task<IReadOnlyList<ContactMessage>> GetAllAsync();
    Task<bool> DeleteAsync(Guid id);
}
