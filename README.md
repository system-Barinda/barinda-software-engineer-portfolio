# Barinda Software Engineer Portfolio

Professional software-engineering portfolio built with ASP.NET Core.

## Structure

- `backend/` — ASP.NET Core Web API
- `backend/data/` — file-based JSON data and portfolio images
- `backend/tests/` — unit and integration tests
- `frontend/` — reserved for the portfolio UI

## Backend

The backend intentionally uses **JSON files instead of PostgreSQL** as the persistence layer.

This makes the portfolio simple to maintain: portfolio data can be edited directly in `backend/data/`, while the API provides a professional way to read and manage the same data.

### Main features

- Projects CRUD
- Skills and profile data
- Experience data
- Contact-message storage
- Admin authentication with JWT
- Validation
- Global error handling
- Structured logging
- Swagger/OpenAPI
- Unit tests
- Integration tests
- Docker
- GitHub Actions CI
- File-based repository/service architecture

## Run

Option A — Run locally with the .NET 10 SDK

1. Install the .NET 10 SDK from https://dotnet.microsoft.com/en-us/download/dotnet/10.0
2. Open a new terminal and verify:

```powershell
dotnet --version
dotnet --list-sdks
```

3. Build and run the backend:

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

Swagger is usually available at `http://localhost:5000/swagger` (use the URL printed by the app).

Option B — Run with Docker (recommended when you don't have `dotnet` locally)

1. Install Docker Desktop for Windows.
2. From the repository root run:

```bash
docker compose up --build
```

The backend container maps port `8080` by default; open `http://localhost:8080/swagger`.

Helper script

There's a helper in `backend/run-dev.ps1` that will prefer Docker if available and fall back to `dotnet`:

```powershell
# from backend folder
./run-dev.ps1 -UseDocker     # force Docker
./run-dev.ps1 -UseDotnet     # force local dotnet
./run-dev.ps1                # auto-detect
```

## Configuration

For development, `backend/appsettings.json` contains non-secret defaults.

For production, set environment variables:

```text
Jwt__Secret
Admin__Username
Admin__Password
```

Use a long random JWT secret in production.

## Data files

```text
backend/data/
├── profile.json
├── skills.json
├── experiences.json
├── projects.json
├── contact-messages.json
└── images/
```

You can manually edit these JSON files. Keep valid JSON syntax.

## API overview

Public:

- `GET /api/profile`
- `GET /api/skills`
- `GET /api/experiences`
- `GET /api/projects`
- `GET /api/projects/{id}`
- `POST /api/contact`

Admin:

- `POST /api/auth/login`
- `GET /api/contact`
- `DELETE /api/contact/{id}`
- `POST /api/projects`
- `PUT /api/projects/{id}`
- `DELETE /api/projects/{id}`

Admin endpoints require a JWT bearer token.

## Important design decision

PostgreSQL and Entity Framework Core were intentionally **not added** because this portfolio is designed around a file-based data store. If the project later grows into a multi-user application, PostgreSQL + EF Core can be introduced behind the repository interfaces without changing the controllers.
