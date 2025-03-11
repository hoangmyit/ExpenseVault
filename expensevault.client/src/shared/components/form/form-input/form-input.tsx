import { FC, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import clsx from 'clsx';

import Input, { InputProps } from '../../ui/input';
import FormField from '../form-field';

interface FormInputProps extends InputProps {
  label?: string;
  error?: FieldError;
  helper?: string;
}

const FormInput: FC<FormInputProps> = forwardRef<
  HTMLInputElement,
  FormInputProps
>(({ label, error, helper, className, ...props }, ref) => {
  return (
    <FormField
      label={label}
      error={error}
      helper={helper}
      id={props.id || props.name}
    >
      <Input
        ref={ref}
        className={clsx('w-full', error ? 'input-error' : '', className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.name}-error` : undefined}
        id={props.id || props.name}
        {...props}
      />
    </FormField>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
