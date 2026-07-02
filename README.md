# GuruSpot Backend

This is the backend repository for the GuruSpot platform.

## What has been done so far
1. **Initial Project Setup**: Created the Node.js project, configured TypeScript, and set up `express` with `cors` and `dotenv`.
2. **Database Schema**: Created `schema.sql` outlining the tables for users, paths, milestones, resources, badges, social posts, and notifications (including `is_admin` role).
3. **Database Connection**: Configured connection to Supabase in `src/config/supabase.ts`.
4. **Authentication Middleware**: Created `src/middlewares/authMiddleware.ts` to verify JWT tokens via Supabase. Added `adminMiddleware.ts` to protect admin-only routes.
5. **Validation Middleware**: Configured `zod` for validating API request payloads dynamically.
6. **API Documentation**: Integrated Swagger UI for API documentation at `/api-docs` (running on port 5000).
7. **User Routes & Controllers**: Added endpoints to fetch and update user profiles (`/api/users`).
8. **Learning Paths API**: Added full CRUD endpoints for learning paths (`/api/learning-paths`), restricted to admins.
9. **Community Posts API**: Added full CRUD endpoints for community posts (`/api/community-posts`), allowing users to manage their own posts.
10. **Automated Testing Setup**: Configured `jest` and `supertest` for integration testing. Mocks the Supabase client to test endpoints safely without a live database connection.
11. **Testing Utilities**: Created a script `scripts/get-token.ts` to generate mock JWT tokens for local Postman/Swagger testing.

## How to Run
1. Run the development server: `npm run dev` (starts on port 5000)
2. View Swagger Docs: `http://localhost:5000/api-docs`
3. Run automated tests: `npm test`
