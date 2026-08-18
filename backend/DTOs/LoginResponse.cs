namespace Portfolio.Api.DTOs;

public sealed record LoginResponse(string Token, DateTime ExpiresAtUtc);
