import { FC } from "react";
import { FormInputProps } from "./form-checkbox.const";
import classNames from "classnames";

const FormCheckbox: FC<FormInputProps> = ({ label, checked, onChange, className, ...otherProps }) => {
  return (
    <div className="form-control mb-4">
      <label className="label mb-1 font-semibold">
        <span className="label-text">{label}</span>
      </label>
      <input
        checked={checked}
        className={classNames('checkbox', className)}
        onChange={onChange}
        type="checkbox"
        {...otherProps}
      />
    </div>
  );
};

export default FormCheckbox;