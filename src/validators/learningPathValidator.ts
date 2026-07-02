import { z } from 'zod';

export const createLearningPathSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    skill_level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }),
});

export const updateLearningPathSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),
    description: z.string().optional(),
    skill_level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }),
});
