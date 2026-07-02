import { z } from 'zod';

export const createCommunityPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    tags: z.array(z.string()).optional(),
  }),
});

export const updateCommunityPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),
    content: z.string().min(10, "Content must be at least 10 characters").optional(),
    tags: z.array(z.string()).optional(),
  }),
});
