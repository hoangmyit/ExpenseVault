import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(50, { message: 'Username cannot exceed 50 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
