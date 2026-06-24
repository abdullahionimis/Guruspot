import { z } from 'zod';

// We define a blueprint for what the data should look like when a user updates their profile
export const updateProfileSchema = z.object({
  body: z.object({
    full_name: z.string().min(2, "Full name must be at least 2 characters").optional(),
    avatar_url: z.string().url("Must be a valid URL").optional(),
    skill_level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    // z.array(z.string()) means we expect a list of strings like ["React", "Node"]
    interests: z.array(z.string()).optional(),
    goals: z.array(z.string()).optional(),
    is_onboarded: z.boolean().optional()
  })
});
