<#
Simple helper script to build and run the backend locally using Docker Compose
or using the local `dotnet` SDK if available.

Usage:
  - To run with Docker Compose (recommended if you don't have dotnet):
      ./run-dev.ps1 -UseDocker
  - To run locally with dotnet SDK:
      ./run-dev.ps1 -UseDotnet
#>
param(
    [switch]$UseDocker,
    [switch]$UseDotnet
)

if ($UseDocker) {
    Write-Host "Starting backend using Docker Compose..."
    Push-Location "$(Split-Path -Parent $MyInvocation.MyCommand.Path)/.."
    docker compose up --build
    Pop-Location
    exit $LASTEXITCODE
}

if ($UseDotnet) {
    Write-Host "Running backend using local dotnet SDK..."
    cd (Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) '.')
    dotnet restore
    dotnet build
    dotnet run
    exit $LASTEXITCODE
}

Write-Host "No mode selected. Use -UseDocker or -UseDotnet. Defaulting to Docker if available..."
try {
    docker --version > $null 2>&1
    Write-Host "Docker detected — starting Docker Compose..."
    Push-Location "$(Split-Path -Parent $MyInvocation.MyCommand.Path)/.."
    docker compose up --build
    Pop-Location
} catch {
    Write-Host "Docker not found. Attempting to use local dotnet..."
    cd (Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) '.')
    dotnet restore
    dotnet build
    dotnet run
}