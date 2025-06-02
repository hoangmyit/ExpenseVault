import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

import { CategoryFormData } from '@/features/category/schemas/category-schema';
import { SupportLanguageField } from '@/shared/types/common';

export type SupportLanguageControlProps = {
  label: string;
  value: SupportLanguageField;
  placeholderPattern: string;
  onChange: (value: SupportLanguageField) => void;
  zodError?:
    | Merge<FieldError, FieldErrorsImpl<SupportLanguageField>>
    | undefined;
  register?: UseFormRegister<CategoryFormData>;
  name?: string;
  setValue?: UseFormSetValue<CategoryFormData>;
  trigger?: UseFormTrigger<CategoryFormData>;
};
