import { Router } from 'express';
import { 
  getLearningPaths, 
  getLearningPathById, 
  createLearningPath, 
  updateLearningPath, 
  deleteLearningPath 
} from '../controllers/learningPathController';
import { requireAuth } from '../middlewares/authMiddleware';
import { requireAdmin } from '../middlewares/adminMiddleware';
import { validateData } from '../middlewares/validateMiddleware';
import { createLearningPathSchema, updateLearningPathSchema } from '../validators/learningPathValidator';

const router = Router();

/**
 * @openapi
 * /api/learning-paths:
 *   get:
 *     summary: Get all learning paths
 *     tags: [Learning Paths]
 */
router.get('/', requireAuth, getLearningPaths);

/**
 * @openapi
 * /api/learning-paths/{id}:
 *   get:
 *     summary: Get a learning path by ID
 *     tags: [Learning Paths]
 */
router.get('/:id', requireAuth, getLearningPathById);

/**
 * @openapi
 * /api/learning-paths:
 *   post:
 *     summary: Create a new learning path (Admin only)
 *     tags: [Learning Paths]
 */
router.post('/', requireAuth, requireAdmin, validateData(createLearningPathSchema), createLearningPath);

/**
 * @openapi
 * /api/learning-paths/{id}:
 *   put:
 *     summary: Update a learning path by ID (Admin only)
 *     tags: [Learning Paths]
 */
router.put('/:id', requireAuth, requireAdmin, validateData(updateLearningPathSchema), updateLearningPath);

/**
 * @openapi
 * /api/learning-paths/{id}:
 *   delete:
 *     summary: Delete a learning path by ID (Admin only)
 *     tags: [Learning Paths]
 */
router.delete('/:id', requireAuth, requireAdmin, deleteLearningPath);

export default router;
