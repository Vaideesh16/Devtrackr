# DevTrackr - Smart Job Application Tracker

DevTrackr is a production-ready MERN application for tracking job applications, monitoring pipeline health, viewing analytics, and staying ahead of follow-ups.

## Tech Stack

- Frontend: React, React Router, Tailwind CSS, Recharts, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT with bcrypt password hashing
- State management: React Context for auth

## Project Structure

```text
Devtrackr/
  client/
    src/
      components/
      context/
      pages/
      services/
      utils/
      App.js
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    server.js
```

## Features

- User signup and login
- JWT-protected API routes
- Job application CRUD
- User-specific application lists
- Search, status filter, date/status sorting
- CSV export
- Dashboard summary cards
- Bar and pie charts by status
- Response rate and interview conversion rate
- Smart insights based on response and rejection patterns
- Upcoming follow-up reminders
- Responsive Tailwind dashboard UI
- Backend and frontend validation
- Centralized API error handling

## Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string
- npm

## Environment Setup

Create backend env file:

```bash
cd server
cp .env.example .env
```

Update `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/devtrackr
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

Create frontend env file:

```bash
cd ../client
cp .env.example .env
```

Update `client/.env` if needed:

```env
VITE_API_URL=http://localhost:5000/api
```

## Install Dependencies

From the project root:

```bash
cd server
npm install

cd ../client
npm install
```

## Run Locally

Start MongoDB first, then open two terminals.

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:3000
```

## API Documentation

Base URL:

```text
http://localhost:5000/api
```

Protected routes require:

```http
Authorization: Bearer <jwt_token>
```

### Auth

`POST /auth/signup`

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "password123"
}
```

`POST /auth/login`

```json
{
  "email": "ada@example.com",
  "password": "password123"
}
```

`GET /auth/me`

Returns the current authenticated user.

### Jobs

`POST /jobs`

```json
{
  "companyName": "Acme Inc",
  "role": "Frontend Engineer",
  "status": "Applied",
  "dateApplied": "2026-05-22",
  "followUpDate": "2026-05-29",
  "notes": "Applied via referral"
}
```

`GET /jobs`

Optional query params:

- `status`: Applied, OA, Interview, Rejected, Offer
- `search`: company or role
- `sortBy`: companyName, role, status, dateApplied, followUpDate, createdAt
- `order`: asc, desc

`PUT /jobs/:id`

Updates a job application.

`DELETE /jobs/:id`

Deletes a job application.

### Analytics

`GET /analytics`

Returns:

- Total applications
- Applications per status
- Response rate
- Interview conversion rate
- Smart insights

### Reminders

`GET /reminders?days=7`

Returns upcoming follow-ups for active applications.

## Production Notes

- Use a strong `JWT_SECRET` in production.
- Set `CLIENT_URL` to the deployed frontend origin.
- Set `NODE_ENV=production`.
- Use MongoDB Atlas or a managed MongoDB deployment.
- Serve the Vite build from a CDN/static host or configure Express to serve `client/dist`.

## Build Commands

Frontend production build:

```bash
cd client
npm run build
```

Backend production start:

```bash
cd server
npm start
```
