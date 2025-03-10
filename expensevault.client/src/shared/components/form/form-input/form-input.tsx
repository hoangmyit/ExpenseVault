import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import clsx from 'clsx';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="form-control w-full max-w-md">
        {label && (
          <label className="label">
            <span className="label-text font-semibold">{label}</span>
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'input input-bordered w-full',
            error && 'input-error',
            className,
          )}
          {...props}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error.message}</span>
          </label>
        )}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
