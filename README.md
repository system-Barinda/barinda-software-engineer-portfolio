# Barinda Software Engineer Portfolio — Frontend

Professional portfolio frontend built with **React, TypeScript, Tailwind CSS, Vite and Lucide icons**.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

The Vite development server proxies `/api` and `/images` to the ASP.NET Core backend at `http://localhost:5000`.

## Build

```bash
npm run build
```

## Sections

- Hero
- About
- Skills
- Projects
- Experience
- Engineering capabilities
- Contact
- Responsive mobile navigation

## Backend connection

Start the ASP.NET Core backend first:

```bash
cd ../backend
dotnet run
```

Then run the frontend in another terminal:

```bash
cd ../frontend
npm install
npm run dev
```

Portfolio content is loaded from the backend JSON files.
