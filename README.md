# Vue AI Project Management Dashboard

An advanced Vue portfolio project: a role-based project workspace with smart risk scoring, Kanban workflow, analytics, responsive UI and an AI recommendation panel.

## Step 1 Completed: UI Polish + Responsive Design

This version improves the visual quality and mobile usability:

- Mobile top bar and bottom navigation
- Responsive dashboard grids
- Better glassmorphism cards
- Polished dark hero headers
- Horizontal-scroll Kanban board on small screens
- Improved project health cards
- Improved analytics and team pages
- Hover states, shadows, gradient progress bars and cleaner spacing

## Features

- Vue 3 + TypeScript + Composition API
- Pinia state management
- Vue Router with role-based protected routes
- Tailwind CSS v4-compatible PostCSS setup
- Modern responsive dashboard UI
- Drag-and-drop Kanban board using native browser drag events
- AI Copilot mock recommendations
- Project risk score indicators
- Analytics charts using lightweight custom components
- Team management page with access control

## Demo Roles

Use the demo login page to preview the app as:

- Admin
- Manager
- Team Member

Admin and Manager can access Analytics and Team pages. Team Member can access Dashboard and Kanban only.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- Lucide Icons

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser.

## Build

```bash
npm run build
```

## Suggested GitHub Repository Name

```bash
vue-ai-project-management-dashboard
```

## Next Development Roadmap

### Phase 2: Backend

- Node.js + Express API
- PostgreSQL or MongoDB database
- JWT authentication
- Task CRUD API
- Project CRUD API
- Comment and activity log API

### Phase 3: Real AI Integration

- Connect AI Copilot to backend endpoint
- Generate task summaries
- Predict deadline risk
- Suggest task priority
- Generate weekly meeting notes

### Phase 4: Real-Time Collaboration

- Socket.io notifications
- Live task movement updates
- Mentions and comment alerts

### Phase 5: Production Quality

- Unit tests with Vitest
- E2E tests with Playwright
- Docker setup
- CI/CD workflow
- Deployed live demo

## Portfolio Pitch

This project demonstrates advanced frontend architecture, role-based UX, responsive interface design, data visualization, drag-and-drop interaction, and AI-ready product thinking.
