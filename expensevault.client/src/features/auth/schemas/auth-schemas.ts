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

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(50, { message: 'Username cannot exceed 50 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*#?&)',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
