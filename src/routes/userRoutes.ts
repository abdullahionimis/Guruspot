import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController';
import { requireAuth } from '../middlewares/authMiddleware';
import { validateData } from '../middlewares/validateMiddleware';
import { updateProfileSchema } from '../validators/userValidator';

const router = Router();

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response containing the user's profile data
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Profile not found
 */
router.get('/profile', requireAuth, getProfile);

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Create or update the logged-in user's profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "John Doe"
 *               avatar_url:
 *                 type: string
 *                 example: "https:
 *               skill_level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *                 example: "beginner"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid request data (validation failed)
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', requireAuth, validateData(updateProfileSchema), updateProfile);

export default router;
