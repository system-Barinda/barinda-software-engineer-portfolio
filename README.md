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

Install the .NET 10 SDK, then:

```bash
cd backend
dotnet restore
dotnet run
```

Swagger is available at:

```text
http://localhost:5000/swagger
```

The exact local URL printed by ASP.NET Core should be used if a different port is selected.

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
