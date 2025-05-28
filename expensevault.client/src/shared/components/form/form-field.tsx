import { FC } from 'react';

import { FormFieldProps } from './form-field.const';

const FormField: FC<FormFieldProps> = ({
  label,
  error,
  helper,
  children,
  id,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default FormField;
