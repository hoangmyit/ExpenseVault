import { z } from 'zod';

import {
  Description_Max_Length,
  Name_Max_Length,
  Name_Min_Length,
} from '@/shared/constants/field-constants';
import { SupportLanguages } from '@/shared/types/common';
import { getArrayLength } from '@/shared/utils/array-util';
import { getLangText } from '@/shared/utils/language-util';
import { getObjectKeys } from '@/shared/utils/object-util';
import { formatString } from '@/shared/utils/string-util';

export const categorySchema = z
  .object({
    id: z.number().min(1, 'ID must be a positive number').optional(),
    name: z
      .record(
        z
          .string()
          .trim()
          .min(1, getLangText('validation:category.nameRequired'))
          .min(
            Name_Min_Length,
            formatString(getLangText('validation:category:nameMin'), {
              0: Name_Min_Length,
            }),
          )
          .max(
            Name_Max_Length,
            formatString(getLangText('validation:category:nameMax'), {
              0: Name_Max_Length,
            }),
          ),
      )
      .refine(
        (nameRecord) =>
          getArrayLength(getObjectKeys(nameRecord)) >
          getArrayLength(SupportLanguages as unknown as string[]),
        {
          message: formatString(getLangText('category:tableHeader.name'), {
            1: getArrayLength(SupportLanguages as unknown as string[]),
          }),
        },
      ),
    description: z
      .record(
        z
          .string()
          .trim()
          .max(
            Description_Max_Length,
            formatString(getLangText('validation:category.descriptionMax'), {
              0: Description_Max_Length,
            }),
          ),
      )
      .refine(
        (nameRecord) =>
          getArrayLength(getObjectKeys(nameRecord)) >
          getArrayLength(SupportLanguages as unknown as string[]),
        {
          message: formatString(
            getLangText('validation:category:languageRequired'),
            {
              0: getLangText('category:tableHeader.description'),
              1: getArrayLength(SupportLanguages as unknown as string[]),
            },
          ),
        },
      ),
    groupId: z
      .number()
      .min(1, getLangText('validation:category.groupIdPositive')),
    isDefault: z.boolean().optional().default(false),
    avatar: z.string().optional(),
  })
  .strict();

export type CategoryFormData = z.infer<typeof categorySchema>;
