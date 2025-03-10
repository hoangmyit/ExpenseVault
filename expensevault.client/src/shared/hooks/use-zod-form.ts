import { useForm, UseFormProps } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Generic hook that works with any Zod schema
export function useZodForm<T extends z.ZodType>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, 'resolver'>,
) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    ...options,
  });
}
