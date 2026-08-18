using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;
using Portfolio.Api.Models;
using Portfolio.Api.Middleware;
using Portfolio.Api.Repositories;
using Portfolio.Api.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Barinda Software Engineer Portfolio API",
        Version = "v1",
        Description = "Backend API for Barinda's professional software-engineering portfolio."
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter: Bearer {your JWT token}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var jwtSecret = builder.Configuration["Jwt:Secret"]
    ?? throw new InvalidOperationException("Jwt:Secret is not configured.");

if (Encoding.UTF8.GetByteCount(jwtSecret) < 32)
{
    throw new InvalidOperationException("Jwt:Secret must contain at least 32 bytes.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

builder.Services.AddAuthorization();

var dataDirectory = Path.Combine(builder.Environment.ContentRootPath, "data");
builder.Services.AddSingleton(new JsonFileStore(dataDirectory));

builder.Services.AddScoped<IProjectRepository, JsonProjectRepository>();
builder.Services.AddScoped<IContactMessageRepository, JsonContactMessageRepository>();
builder.Services.AddScoped<IProfileRepository, JsonProfileRepository>();
builder.Services.AddScoped<ICollectionRepository<Skill>>(sp =>
    new JsonCollectionRepository<Skill>(
        sp.GetRequiredService<JsonFileStore>(),
        "skills.json",
        Array.Empty<Skill>()));
builder.Services.AddScoped<ICollectionRepository<Experience>>(sp =>
    new JsonCollectionRepository<Experience>(
        sp.GetRequiredService<JsonFileStore>(),
        "experiences.json",
        Array.Empty<Experience>()));

builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IResumeService, ResumeService>();
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

app.UseMiddleware<GlobalExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(dataDirectory, "images")),
    RequestPath = "/images"
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }
