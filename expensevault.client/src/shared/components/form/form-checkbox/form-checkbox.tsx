import { FC } from 'react';

import clsx from 'clsx';

import { FormCheckboxProps } from './form-checkbox.const';

const FormCheckbox: FC<FormCheckboxProps> = ({
  onChange,
  label,
  className,
  checked,
  size = 'md',
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
        className={clsx('checkbox', `checkbox-${size}`, className)}
        checked={checked}
        {...otherProps}
      />
    </div>
  );
};

export default FormCheckbox;
