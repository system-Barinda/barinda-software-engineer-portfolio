using Portfolio.Api.DTOs;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories;

namespace Portfolio.Api.Services;

public sealed class ContactService(
    IContactMessageRepository repository,
    ILogger<ContactService> logger) : IContactService
{
    public async Task<ContactMessage> CreateAsync(CreateContactMessageRequest request)
    {
        var message = new ContactMessage
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Email = request.Email.Trim().ToLowerInvariant(),
            Subject = request.Subject.Trim(),
            Message = request.Message.Trim(),
            CreatedAtUtc = DateTime.UtcNow,
            Read = false
        };

        logger.LogInformation("New contact message received from {Email}", message.Email);
        return await repository.AddAsync(message);
    }

    public Task<IReadOnlyList<ContactMessage>> GetAllAsync() => repository.GetAllAsync();

    public Task<bool> DeleteAsync(Guid id) => repository.DeleteAsync(id);
}
