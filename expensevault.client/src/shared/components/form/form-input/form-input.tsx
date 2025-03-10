import { FC, forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import clsx from 'clsx';

import FormField from '../form-field';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
      <input
        ref={ref}
        className={clsx(
          'input input-bordered w-full',
          error ? 'input-error' : '',
          className,
        )}
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
