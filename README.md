# Vue AI Project Management Dashboard

Advanced portfolio project built with **Vue 3 + TypeScript + Pinia + Vue Router + Tailwind CSS v4** and a **Node + Express JWT authentication API**.

## Step 2 status

This version adds a real backend authentication layer:

- Node + Express API
- JWT login/session flow
- Password validation with bcrypt
- Role-based access control
- Protected frontend routes
- Backend-protected `/users` API route
- Demo accounts for Admin, Manager and Team Member

## Demo accounts

All demo users use this password:

```txt
password123
```

| Role | Email | Access |
|---|---|---|
| Admin | admin@demo.com | Full access |
| Manager | manager@demo.com | Projects, analytics and team |
| Team Member | member@demo.com | Dashboard and Kanban only |

## Install

```bash
npm install
```

## Run client and backend together

```bash
npm run dev:full
```

Client:

```txt
http://localhost:5173
```

Backend API:

```txt
http://localhost:4000/api
```

## Run separately

Terminal 1:

```bash
npm run dev:server
```

Terminal 2:

```bash
npm run dev
```

## Environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Default development values already work even without `.env`, but production should use a strong `JWT_SECRET`.

## API routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | Check API status |
| POST | `/api/auth/login` | Email/password login |
| POST | `/api/auth/demo-login` | Quick role login |
| GET | `/api/auth/me` | Verify current user |
| GET | `/api/users` | Admin/Manager-only team list |
| GET | `/api/projects` | Protected project list |

## Build

```bash
npm run build
```

## Next roadmap

1. Database with MongoDB or PostgreSQL
2. Real task/project CRUD API
3. OpenAI-powered AI Copilot
4. Socket.io notifications
5. Deployment on Vercel + Render/Railway
