# Vue AI Project Management Dashboard

Advanced portfolio project built with **Vue 3 + TypeScript + Pinia + Vue Router + Tailwind CSS v4** and a **Node + Express backend**.

## Step 3 status

This version adds database-style persistence using a local JSON database file. It is intentionally dependency-light so it runs easily on Windows without installing MongoDB first.

Added in this step:

- Persistent local database file at `server/data/db.json`
- Login reads users from the database file
- Register API route
- Projects API reads/writes database data
- Tasks API reads/writes database data
- Kanban drag-and-drop task status updates are saved
- Activity feed is saved in the backend database
- Admin-only development database reset route

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
npm install --no-audit --no-fund
```

If your `node_modules` folder already works from Step 2, this Step 3 version does not add new npm dependencies.

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
npm run dev:client
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

Default development values work even without `.env`.

```env
VITE_API_URL=http://localhost:4000/api
PORT=4000
JWT_SECRET=change_this_dev_secret_before_production
CLIENT_ORIGIN=http://localhost:5173
DB_FILE_PATH=server/data/db.json
```

## API routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | Check API and database path |
| POST | `/api/auth/login` | Email/password login from database |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/demo-login` | Quick role login |
| GET | `/api/auth/me` | Verify current user |
| GET | `/api/users` | Admin/Manager-only team list |
| GET | `/api/projects` | Protected project list from database |
| POST | `/api/projects` | Admin/Manager create project |
| GET | `/api/tasks` | Protected task list from database |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:taskId/status` | Save Kanban status change |
| GET | `/api/activity` | Saved activity feed |
| POST | `/api/dev/reset-db` | Admin-only reset local database |

## Test persistence

1. Login as Manager or Admin.
2. Go to Kanban.
3. Drag a task to another column.
4. Refresh the browser.
5. The task should stay in the new column because the backend wrote it to `server/data/db.json`.

## Build

```bash
npm run build
```

## Next roadmap

1. Replace local JSON database with MongoDB Atlas or PostgreSQL
2. Add create/edit project and task forms in the UI
3. Add OpenAI-powered AI Copilot API
4. Add Socket.io real-time notifications
5. Deploy frontend on Vercel and backend on Render/Railway
