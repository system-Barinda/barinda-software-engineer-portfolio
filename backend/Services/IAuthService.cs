using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services;

public interface IAuthService
{
    LoginResponse? Login(LoginRequest request);
}
