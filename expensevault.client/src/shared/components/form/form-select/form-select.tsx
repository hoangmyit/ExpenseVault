import { FC } from 'react';

import SelectControl from '../../ui/select-control/select-control';

import { FormSelectProps } from './form-select.const';

const FormSelect: FC<FormSelectProps> = ({
  options,
  value,
  onChange,
  className = '',
  placeholder = 'Please select',
  label,
  disabled = false,
  required = false,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className="form-control flex flex-row items-center gap-2">
      <label className="label font-semibold">
        <span className="label-text">{label}</span>
      </label>
      <SelectControl options={options} onChange={handleChange} />
    </div>
  );
};

export default FormSelect;
