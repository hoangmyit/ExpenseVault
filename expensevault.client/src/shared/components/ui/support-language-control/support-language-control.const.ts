import { SupportLanguageField } from '@/shared/types/common';

export type SupportLanguageControlProps = {
  label: string;
  value: SupportLanguageField;
  placeholderPattern: string;
  onChange: (value: SupportLanguageField) => void;
};
