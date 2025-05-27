import { FC } from 'react';

import { FormCheckboxProps } from './form-checkbox.const';

const FormCheckbox: FC<FormCheckboxProps> = ({
  onChange,
  label,
  className,
  checked,
  ...otherProps
}) => {
  return (
    <div className="form-control flex flex-row items-center gap-2">
      <label className="label font-semibold">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="checkbox"
        onChange={(e) => onChange?.(e)}
        className={className}
        checked={checked}
        {...otherProps}
      />
    </div>
  );
};

export default FormCheckbox;
