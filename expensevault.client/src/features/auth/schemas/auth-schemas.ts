import { z } from 'zod';

import {
  Email_Max_Length,
  Password_Max_Length,
  Password_Min_Length,
  Username_Max_Length,
  Username_Min_Length,
} from '../constants/validation.const';

import { getLangText } from '@/shared/utils/language-util';
import { formatString } from '@/shared/utils/string-util';

export const loginSchema = z.object({
  username: z
    .string()
    .min(Username_Min_Length, {
      message: formatString(getLangText('validation:auth.usernameMin'), {
        0: Username_Min_Length,
      }),
    })
    .max(Username_Max_Length, {
      message: formatString(getLangText('validation:auth.usernameMax'), {
        0: Username_Max_Length,
      }),
    }),
  password: z
    .string()
    .min(Password_Min_Length, {
      message: formatString(getLangText('validation:auth.passwordMin'), {
        0: Password_Min_Length,
      }),
    })
    .max(Password_Max_Length, {
      message: formatString(getLangText('validation:auth.passwordMax'), {
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
        message: formatString(getLangText('validation:auth.usernameMin'), {
          0: Username_Min_Length,
        }),
      })
      .max(Username_Max_Length, {
        message: formatString(getLangText('validation:auth.usernameMax'), {
          0: Username_Max_Length,
        }),
      })
      .regex(/^[a-zA-Z0-9_]*$/, {
        message: getLangText('validation:auth.usernamePattern'),
      }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .max(Email_Max_Length, {
        message: formatString(getLangText('validation:auth.emailMax'), {
          0: Email_Max_Length,
        }),
      }),
    password: z
      .string()
      .min(Password_Min_Length, {
        message: formatString(getLangText('validation:auth.usernameMin'), {
          0: Password_Min_Length,
        }),
      })
      .max(Password_Max_Length, {
        message: formatString(getLangText('validation:auth.usernameMax'), {
          0: Password_Max_Length,
        }),
      })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_])[A-Za-z\d@$!%*#?&]{8,}$/,
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*#?&)',
        },
      ),
    confirmPassword: z
      .string()
      .min(Password_Min_Length, {
        message: formatString(getLangText('validation:auth.usernameMin'), {
          0: Password_Min_Length,
        }),
      })
      .max(Password_Max_Length, {
        message: formatString(getLangText('validation:auth.usernameMax'), {
          0: Password_Max_Length,
        }),
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: getLangText('validation:auth.passwordsDoNotMatch'),
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
