import { FC, forwardRef } from 'react';

import { SelectControlComponentProps } from './select-control.const';

import { mapArray } from '@/shared/utils/array-util';

const SelectControl: FC<SelectControlComponentProps> = forwardRef<
  HTMLSelectElement,
  SelectControlComponentProps
>(({ options = [], placeholder = 'Please select', ...props }, ref) => {
  return (
    <select ref={ref} className="select select-bordered w-full" {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {mapArray(options, (option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
});

SelectControl.displayName = 'SelectControl';
export default SelectControl;
