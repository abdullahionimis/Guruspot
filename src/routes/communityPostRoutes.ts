import { Router } from 'express';
import { 
  getCommunityPosts, 
  getCommunityPostById, 
  createCommunityPost, 
  updateCommunityPost, 
  deleteCommunityPost 
} from '../controllers/communityPostController';
import { requireAuth } from '../middlewares/authMiddleware';
import { validateData } from '../middlewares/validateMiddleware';
import { createCommunityPostSchema, updateCommunityPostSchema } from '../validators/communityPostValidator';

const router = Router();

/**
 * @openapi
 * /api/community-posts:
 *   get:
 *     summary: Get all community posts
 *     tags: [Community Posts]
 */
router.get('/', requireAuth, getCommunityPosts);

/**
 * @openapi
 * /api/community-posts/{id}:
 *   get:
 *     summary: Get a community post by ID
 *     tags: [Community Posts]
 */
router.get('/:id', requireAuth, getCommunityPostById);

/**
 * @openapi
 * /api/community-posts:
 *   post:
 *     summary: Create a new community post
 *     tags: [Community Posts]
 */
router.post('/', requireAuth, validateData(createCommunityPostSchema), createCommunityPost);

/**
 * @openapi
 * /api/community-posts/{id}:
 *   put:
 *     summary: Update a community post by ID
 *     tags: [Community Posts]
 */
router.put('/:id', requireAuth, validateData(updateCommunityPostSchema), updateCommunityPost);

/**
 * @openapi
 * /api/community-posts/{id}:
 *   delete:
 *     summary: Delete a community post by ID
 *     tags: [Community Posts]
 */
router.delete('/:id', requireAuth, deleteCommunityPost);

export default router;
