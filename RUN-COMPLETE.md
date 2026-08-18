# Complete local run

## Backend
```bash
cd backend
dotnet restore
dotnet run
```
Backend: http://localhost:5000
Swagger: http://localhost:5000/swagger

## Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

The frontend reads profile, skills, experience and projects from the ASP.NET Core API. Contact form submissions are sent to `/api/contact`.

## Content
Edit backend/data/profile.json, skills.json, experiences.json and projects.json. Put images in backend/data/images/.
