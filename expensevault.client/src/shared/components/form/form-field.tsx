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
    <>
      {label && (
        <label htmlFor={id} className="fieldset-label">
          {label}
        </label>
      )}
      {children}
      <div className="fieldset-label min-h-6">
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
    </>
  );
};

export default FormField;
