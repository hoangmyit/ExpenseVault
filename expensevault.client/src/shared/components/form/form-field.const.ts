import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export type FormFieldBaseProps = {
  label?: string;
  error?: FieldError;
  helper?: string;
};

export type FormFieldProps = FormFieldBaseProps & {
  children: ReactNode;
  id?: string;
  showValidation?: boolean;
};
