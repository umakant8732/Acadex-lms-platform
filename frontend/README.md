# Acadex Frontend

Acadex Frontend is the React application for the public site, teacher dashboard, student learning experience, auth flows, course preview, lecture playback, and checkout flow.

It is built with a feature-first structure so teacher, student, auth, payment, course, and lecture surfaces stay easy to maintain as the platform grows.

## Tech Stack

- React
- Vite
- React Router
- TanStack Query
- Redux Toolkit
- Axios
- Tailwind CSS
- DaisyUI
- Socket.IO Client
- React Player
- React Paginate
- Zod

## Main Frontend Areas

### Public
- Home page
- Published course catalog
- Course preview/details page
- Auth-aware CTA flow

### Auth
- Register
- Login
- Verify email / OTP
- Forgot password
- Session restore and logout flow

### Teacher
- Dashboard
- Manage courses
- Create, update, view, publish, delete courses
- Thumbnail upload and replace
- Manage lectures and curriculum
- Video upload, processing state, and preview playback

### Student
- Course library
- Course overview page
- Checkout flow
- Secure lecture watch page
- Locked and preview lesson states

## Project Structure

```text
src/
  app/       providers and app-level setup
  assets/    static assets
  features/  auth, course, lecture, payment feature modules
  layouts/   public, teacher, student, auth layouts
  routes/    route definitions
  shared/    reusable UI and shared app pieces
```

## Scripts

```bash
npm run dev      # start Vite dev server
npm run build    # create production build
npm run preview  # preview production build locally
npm run lint     # run ESLint
```

## Local Setup

1. Go to the frontend folder:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` for local development.

4. Start the app:

```bash
npm run dev
```

## Frontend Environment Overview

Important frontend env values:

- `VITE_API_URL` for backend API base URL
- `VITE_SOCKET_URL` for Socket.IO connection
- any future public-only build-time values should also use the `VITE_` prefix

## Data and State Flow

- TanStack Query handles server-state fetching, caching, and invalidation
- Redux Toolkit stores auth-related client state
- Socket.IO updates lecture processing, ready, and failed states without page refresh
- direct S3 upload flows are handled from the browser using presigned URLs

## Production Notes

Current production frontend setup uses:

- Vite production build
- Nginx static hosting on EC2
- HTTPS through Let's Encrypt
- same-domain API access through Nginx reverse proxy
- CloudFront-backed thumbnail and video URLs from backend responses

## Related Docs

- [Platform Roadmap](../1.PROJECT_PHASE_ROADMAP.txt)
- [EC2 Deployment Guide](../2.EC2_DEPLOYMENT_GUIDE.txt)
- [Production Checklist](../3.PRODUCTION_CHECKLIST.txt)
