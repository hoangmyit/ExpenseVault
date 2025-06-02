import { z } from 'zod';

import {
  Description_Max_Length,
  Name_Max_Length,
  Name_Min_Length,
} from '@/shared/constants/field-constants';
import { SupportLanguageField, SupportLanguages } from '@/shared/types/common';
import { getArrayLength } from '@/shared/utils/array-util';
import { getLangText } from '@/shared/utils/language-util';
import { getObjectKeys } from '@/shared/utils/object-util';
import {
  formatString,
  lengthString,
  trimString,
} from '@/shared/utils/string-util';
import {
  isNullOrUndefined,
  isObject,
  isString,
} from '@/shared/utils/type-utils';

export const categorySchema = z
  .object({
    id: z.number().min(1, 'ID must be a positive number').optional(),
    name: z.custom<SupportLanguageField>((val) => {
      if (!isObject(val) || isNullOrUndefined(val)) {
        throw new z.ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: getLangText('validation:category.nameRequired'),
            path: ['name'],
          },
        ]);
      }
      const errors: z.ZodIssue[] = [];

      // Check if all values meet the string requirements
      for (const [key, value] of Object.entries(val)) {
        const path = ['name', key];
        if (!isString(value) || lengthString(value as string) === 0) {
          errors.push({
            code: z.ZodIssueCode.custom,
            message: getLangText('validation:category.nameRequired'),
            path: path,
          });
        }

        const trimmedValue = trimString(value as string);

        if (lengthString(trimmedValue) < Name_Min_Length) {
          errors.push({
            code: z.ZodIssueCode.custom,
            message: formatString(getLangText('validation:category:nameMin'), {
              0: Name_Min_Length,
            }),
            path: path,
          });
        } else if (lengthString(trimmedValue) > Name_Max_Length) {
          errors.push({
            code: z.ZodIssueCode.custom,
            message: formatString(getLangText('validation:category:nameMax'), {
              0: Name_Max_Length,
            }),
            path: path,
          });
        }
      }

      if (
        getArrayLength(getObjectKeys(val)) < getArrayLength(SupportLanguages)
      ) {
        errors.push({
          code: z.ZodIssueCode.custom,
          message: formatString(
            getLangText('validation:category:languageRequired'),
            {
              0: getLangText('category:tableHeader.name'),
              1: getArrayLength(SupportLanguages),
            },
          ),
          path: ['name'],
        });
      }

      if (getArrayLength(errors) > 0) {
        throw new z.ZodError(errors);
      }
      return true;
    }),
    description: z.custom<SupportLanguageField>((val) => {
      if (!isObject(val) || isNullOrUndefined(val)) {
        throw new z.ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: getLangText('validation:category.descriptionRequired'),
            path: ['description'],
          },
        ]);
      }
      const errors: z.ZodIssue[] = [];

      // Check if all values meet the string requirements
      for (const [key, value] of Object.entries(val)) {
        const path = ['description', key];
        const trimmedValue = trimString(value as string);

        if (lengthString(trimmedValue) > Description_Max_Length) {
          errors.push({
            code: z.ZodIssueCode.custom,
            message: formatString(
              getLangText('validation:category:descriptionMax'),
              {
                0: Description_Max_Length,
              },
            ),
            path: path,
          });
        }
      }

      if (
        getArrayLength(getObjectKeys(val)) < getArrayLength(SupportLanguages)
      ) {
        errors.push({
          code: z.ZodIssueCode.custom,
          message: formatString(
            getLangText('validation:category:languageRequired'),
            {
              0: getLangText('category:tableHeader.description'),
              1: getArrayLength(SupportLanguages),
            },
          ),
          path: ['description'],
        });
      }

      if (getArrayLength(errors) > 0) {
        throw new z.ZodError(errors);
      }
      return true;
    }),
    groupId: z
      .number()
      .min(1, getLangText('validation:category.groupIdPositive')),
    isDefault: z.boolean().optional().default(false),
    avatar: z.string().optional().default('/images/category-avatar.png'),
  })
  .strict();

export type CategoryFormData = z.infer<typeof categorySchema>;
