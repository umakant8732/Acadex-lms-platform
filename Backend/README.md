# Acadex Backend

Acadex Backend powers the teacher, student, auth, payment, and media workflows for the Acadex LMS platform.

It provides secure REST APIs, background workers, direct S3 upload flows, CloudFront playback access, and enrollment-based course access control.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Redis
- BullMQ
- Socket.IO
- Razorpay
- AWS S3
- AWS CloudFront
- FFmpeg
- Zod

## Core Modules

### Auth
- Register, login, logout, refresh token, current user
- OTP email verification flow
- Forgot password and reset password flow
- JWT-based auth with role checks

### Course
- Teacher course CRUD
- Publish and unpublish flow
- Manage course filters, pagination, and search
- Public published course catalog
- Student course library and overview
- Direct S3 thumbnail upload with CloudFront delivery

### Lecture
- Teacher lecture curriculum management
- Presigned S3 video upload flow
- Upload completion verification
- HLS transcoding in background worker
- Secure CloudFront playback access
- Student watch page support with enrollment and preview checks
- Socket-based lecture status updates

### Payment and Enrollment
- Razorpay order creation
- Payment verification
- Payment failure reporting
- Enrollment creation after successful payment
- Duplicate purchase and duplicate enrollment protection

## Project Structure

```text
src/
  app/          server and worker entry points
  config/       env, Redis, AWS, CloudFront, socket, client origins
  middlewares/  auth, role, validation, error handling
  modules/      auth, course, lecture, payment, enrollment
  routes/       route registration
  templates/    email templates
  utils/        logger, API helpers, shared utilities
```

## Scripts

```bash
npm run dev         # start API server with nodemon
npm run dev:worker  # start background worker with nodemon
npm run start       # start API server in production mode
npm run start:worker
```

## Local Setup

1. Go to the backend folder:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` with your local values.

4. Make sure these services are available:
- MongoDB
- Redis
- AWS S3 credentials
- CloudFront keys for playback
- Razorpay test keys

5. Start the API server:

```bash
npm run dev
```

6. Start the worker in a separate terminal:

```bash
npm run dev:worker
```

## Environment Overview

Important backend env groups:

- App: `PORT`, `NODE_ENV`
- Database: `MONGO_URI`
- Auth: `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, token expiry values
- Client: `CLIENT_URL`, `CLIENT_URLS`
- Cookies: `COOKIE_SECURE`, `COOKIE_SAME_SITE`
- Redis: `REDIS_URL`
- Email: `EMAIL_USER`, `EMAIL_PASS`
- AWS: `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_NAME`
- Uploads: `AWS_S3_UPLOAD_URL_EXPIRES_IN`
- Razorpay: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- CloudFront: `CLOUDFRONT_DOMAIN`, `CLOUDFRONT_KEY_PAIR_ID`, `CLOUDFRONT_PRIVATE_KEY_PATH`

## Background Jobs

The worker process handles long-running tasks outside the request cycle:

- lecture video transcoding
- HLS upload pipeline
- expired upload cleanup
- auth email queue processing

## Production Notes

Current production setup uses:

- AWS EC2 for frontend and backend hosting
- Nginx as reverse proxy
- PM2 for backend and worker process management
- MongoDB Atlas in production
- Redis on the EC2 server
- S3 for media storage
- CloudFront for thumbnails and secure video playback
- Let's Encrypt for HTTPS

## Related Docs

- [Platform Roadmap](../1.PROJECT_PHASE_ROADMAP.txt)
- [EC2 Deployment Guide](../2.EC2_DEPLOYMENT_GUIDE.txt)
- [Production Checklist](../3.PRODUCTION_CHECKLIST.txt)
