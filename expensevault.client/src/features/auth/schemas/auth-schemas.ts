import i18n from 'i18next';
import { z } from 'zod';

import {
  Password_Max_Length,
  Password_Min_Length,
  Username_Max_Length,
  Username_Min_Length,
} from '../constants/validation.const';

import { formatString } from '@/shared/utils/string-util';

export const loginSchema = z.object({
  username: z
    .string()
    .min(Username_Min_Length, {
      message: formatString(i18n.t('validation:auth.usernameMin'), {
        0: Username_Min_Length,
      }),
    })
    .max(Username_Max_Length, {
      message: formatString(i18n.t('validation:auth.usernameMax'), {
        0: Username_Max_Length,
      }),
    }),
  password: z
    .string()
    .min(Password_Min_Length, {
      message: formatString(i18n.t('validation:auth.passwordMin'), {
        0: Password_Min_Length,
      }),
    })
    .max(Password_Max_Length, {
      message: formatString(i18n.t('validation:auth.passwordMax'), {
        0: Password_Max_Length,
      }),
    }),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(Username_Min_Length, {
        message: 'Username must be at least 3 characters',
      })
      .max(Username_Max_Length, {
        message: 'Username cannot exceed 50 characters',
      })
      .regex(/^[a-zA-Z0-9_]*$/, {
        message: 'Username must contain only letters, numbers, and underscores',
      }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(Password_Min_Length, {
        message: 'Password must be at least 8 characters',
      })
      .max(Password_Max_Length, {
        message: 'Password cannot exceed 50 characters',
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*#?&)',
      }),
    confirmPassword: z
      .string()
      .min(Password_Min_Length, {
        message: 'Password must be at least 8 characters',
      })
      .max(Password_Max_Length, {
        message: 'Password cannot exceed 50 characters',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
