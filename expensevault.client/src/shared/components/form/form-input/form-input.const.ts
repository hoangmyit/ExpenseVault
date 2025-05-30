import { FieldError } from 'react-hook-form';

import { InputProps } from '../../ui';

export type FormInputProps = {
  label: string;
  error?: FieldError;
  helper?: string;
} & InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;
