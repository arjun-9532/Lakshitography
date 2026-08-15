# Lakshitography Next.js app

This is the complete web application: the public site, admin dashboard, and API now run from one Next.js process.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set these server-only values in `.env`:

```dotenv
MONGO_URL=mongodb://localhost:27017
DB_NAME=lakshitography
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=lakshitography@gmail.com
ADMIN_PASSWORD=replace-with-a-strong-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

The first request that needs the database creates the indexes and seeds (or updates) the configured admin account. `NEXT_PUBLIC_BACKEND_URL` is no longer used and should be removed from `.env`.

## Commands

```bash
npm run dev        # development server on http://localhost:3000
npm run build      # production build
npm run start:prod # production server
```

## API

All API endpoints are implemented as Next App Router route handlers under `src/app/api` and are available on the same origin:

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/bookings`, `GET /api/bookings`
- `PATCH /api/bookings/:bookingId`, `DELETE /api/bookings/:bookingId`
- `GET /api/admin/stats`
- `GET /api/health`
- `GET /api/gallery`, `POST /api/gallery` (admin upload)
