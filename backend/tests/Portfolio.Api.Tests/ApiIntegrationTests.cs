using Microsoft.AspNetCore.Mvc.Testing;

namespace Portfolio.Api.Tests;

public sealed class ApiIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ApiIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetProfile_returns_success()
    {
        var response = await _client.GetAsync("/api/profile");

        response.EnsureSuccessStatusCode();
    }
}
