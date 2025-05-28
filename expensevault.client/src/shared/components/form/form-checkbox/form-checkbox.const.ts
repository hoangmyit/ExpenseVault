import { SizeType } from '@/shared/types/common';

export type FormCheckboxProps = {
  label: string;
  size?: SizeType;
} & React.InputHTMLAttributes<HTMLInputElement>;
