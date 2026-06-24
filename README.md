# GuruSpot Backend

This is the backend repository for the GuruSpot platform.

## What has been done so far
1. **Initial Project Setup**: Created the Node.js project, configured TypeScript, and set up `express` with `cors` and `dotenv`.
2. **Database Schema**: Created `schema.sql` outlining the tables for users, paths, milestones, resources, badges, social posts, and notifications.
3. **Database Connection**: Configured connection to Supabase in `src/config/supabase.ts`.
4. **Authentication Middleware**: Created `src/middlewares/authMiddleware.ts` to verify JWT tokens via Supabase.
5. **Validation Middleware**: Configured `zod` for validating API request payloads dynamically.
6. **API Documentation**: Integrated Swagger UI for API documentation at `/api-docs`.
7. **User Routes & Controllers**: Added initial endpoints to fetch and update user profiles.

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Add your Supabase credentials in a `.env` file (see `.env.example` or update `.env`).
4. Run `npm run dev` to start the local development server.

## Scripts
- `npm run dev`: Run server in development mode.
- `npm run build`: Compile TypeScript.
- `npm start`: Start compiled JS in production.
