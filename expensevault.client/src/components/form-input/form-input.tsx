import classNames from 'classnames';
import { FC } from 'react';

import { FormInputProps } from './form-input.const';

const FormInput: FC<FormInputProps> = ({
  onChange,
  label,
  type,
  placeholder,
  className,
  ...otherProps
}) => {
  return (
    <div className="form-control mb-4 flex flex-col">
      <label className="label mb-1 font-semibold">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={classNames('input input-bordered w-full', className)}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
