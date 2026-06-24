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
