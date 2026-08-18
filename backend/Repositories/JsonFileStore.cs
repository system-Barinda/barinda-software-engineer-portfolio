using System.Text.Json;

namespace Portfolio.Api.Repositories;

public sealed class JsonFileStore
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true
    };

    private readonly string _dataDirectory;
    private readonly SemaphoreSlim _lock = new(1, 1);

    public JsonFileStore(string dataDirectory)
    {
        _dataDirectory = dataDirectory;
        Directory.CreateDirectory(_dataDirectory);
        Directory.CreateDirectory(Path.Combine(_dataDirectory, "images"));
    }

    public async Task<T> ReadAsync<T>(string fileName, T fallback)
    {
        var path = Path.Combine(_dataDirectory, fileName);

        await _lock.WaitAsync();
        try
        {
            if (!File.Exists(path))
            {
                await WriteInternalAsync(path, fallback);
                return fallback;
            }

            var json = await File.ReadAllTextAsync(path);
            return JsonSerializer.Deserialize<T>(json, JsonOptions) ?? fallback;
        }
        finally
        {
            _lock.Release();
        }
    }

    public async Task WriteAsync<T>(string fileName, T value)
    {
        var path = Path.Combine(_dataDirectory, fileName);

        await _lock.WaitAsync();
        try
        {
            await WriteInternalAsync(path, value);
        }
        finally
        {
            _lock.Release();
        }
    }

    private static async Task WriteInternalAsync<T>(string path, T value)
    {
        var json = JsonSerializer.Serialize(value, JsonOptions);
        var tempPath = $"{path}.tmp";

        await File.WriteAllTextAsync(tempPath, json);
        File.Move(tempPath, path, true);
    }
}
