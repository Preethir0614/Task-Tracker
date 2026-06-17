# Task Tracker

A simple single-user Task Tracker built for the practical implementation task. It uses PostgreSQL for storage, an Express REST API for CRUD operations, and an Angular frontend for creating, viewing, filtering, toggling, and deleting tasks.

## Features

- Add a task with title, optional description, optional due date, and priority.
- View tasks sorted by nearest due date first.
- Mark tasks Done or Pending with one click.
- Delete tasks after a browser confirmation prompt.
- Filter tasks by status and priority.
- View a live counter for pending and done tasks.

## Tech Stack

- PostgreSQL
- Node.js + Express
- Angular

## Project Structure

```text
backend/
  db.js
  schema.sql
  server.js
frontend/
  src/app/components/task-form/
  src/app/components/task-list/
  src/app/services/task.ts
  src/app/models/task.ts
```

## Database Setup

1. Create a PostgreSQL database, for example:

```sql
CREATE DATABASE task_tracker;
```

2. Run the schema and seed script:

```bash
psql -U postgres -d task_tracker -f backend/schema.sql
```

The script creates the `tasks` table and inserts three sample tasks.

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm start
```

Update `.env` with your PostgreSQL credentials:

```text
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_tracker
PORT=3000
```

The API runs at `http://localhost:3000`.

## API Endpoints

- `GET /api/tasks`
- `GET /api/tasks?status=Pending&priority=High`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Example create request:

```bash
curl -X POST http://localhost:3000/api/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Submit assignment\",\"priority\":\"High\",\"due_date\":\"2026-06-18\"}"
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

## Screenshots

Add screenshots here after running the app locally:

- Task list with filters and counter
- Add task form
- Delete confirmation prompt

Suggested location: `docs/screenshots/`.

## Assumptions

- This is a single-user app, so authentication is not included.
- `PUT /api/tasks/:id` performs a full update and is used for toggling task status.
- The frontend expects the backend API to run on `http://localhost:3000`.
- Tasks with no due date are shown after dated tasks.

## Verification

- Backend JavaScript syntax check: `node --check backend/server.js`
- Frontend production build: `npm run build` from `frontend/`
