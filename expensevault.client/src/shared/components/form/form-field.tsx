import { FC, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label?: string;
  error?: FieldError;
  helper?: string;
  children: ReactNode;
  id?: string;
  showValidation?: boolean;
}

const FormField: FC<FormFieldProps> = ({
  label,
  error,
  helper,
  children,
  id,
}) => {
  return (
    <div className="form-control w-full max-w-md">
      {label && (
        <label htmlFor={id} className="label">
          <span className="label-text font-semibold">{label}</span>
        </label>
      )}
      {children}
      <div className="flex h-6 items-start px-1 pt-1">
        {helper && !error && (
          <span className="label-text-alt text-gray-500">{helper}</span>
        )}
        {error && (
          <span className="label-text-alt text-error" id={`${id}-error`}>
            {error.message}
          </span>
        )}
        {!helper && !error && <span className="label-text-alt"></span>}
      </div>
    </div>
  );
};

export default FormField;
