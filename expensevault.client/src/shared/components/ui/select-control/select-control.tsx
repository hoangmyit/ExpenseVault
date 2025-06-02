import { FC, forwardRef } from 'react';

import clsx from 'clsx';

import { SelectControlComponentProps } from './select-control.const';

import { Default_Default_Select_Option } from '@/shared/constants/field-constants';
import { mapArray } from '@/shared/utils/array-util';
import { isNullOrEmpty } from '@/shared/utils/type-utils';

const SelectControl: FC<SelectControlComponentProps> = forwardRef<
  HTMLSelectElement,
  SelectControlComponentProps
>(
  (
    { options = [], placeholder = 'Please select', className, value, ...props },
    ref,
  ) => {
    return (
      <select
        ref={ref}
        defaultValue={
          isNullOrEmpty(value) ? Default_Default_Select_Option : undefined
        }
        className={clsx('select select-bordered', className, 'w-full')}
        value={value}
        {...props}
      >
        {placeholder && (
          <option value={Default_Default_Select_Option} disabled={true}>
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
  },
);

SelectControl.displayName = 'SelectControl';
export default SelectControl;
