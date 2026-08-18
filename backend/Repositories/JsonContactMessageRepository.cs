using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories;

public sealed class JsonContactMessageRepository(JsonFileStore store) : IContactMessageRepository
{
    private const string FileName = "contact-messages.json";

    public async Task<IReadOnlyList<ContactMessage>> GetAllAsync()
        => (await store.ReadAsync(FileName, new List<ContactMessage>()))
            .OrderByDescending(x => x.CreatedAtUtc)
            .ToList();

    public async Task<ContactMessage> AddAsync(ContactMessage message)
    {
        var messages = (await store.ReadAsync(FileName, new List<ContactMessage>())).ToList();
        messages.Add(message);
        await store.WriteAsync(FileName, messages);
        return message;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var messages = (await store.ReadAsync(FileName, new List<ContactMessage>())).ToList();
        var removed = messages.RemoveAll(x => x.Id == id) > 0;

        if (removed)
            await store.WriteAsync(FileName, messages);

        return removed;
    }
}
