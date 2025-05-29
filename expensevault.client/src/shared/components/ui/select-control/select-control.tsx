import { FC, forwardRef } from 'react';

import clsx from 'clsx';

import { SelectControlComponentProps } from './select-control.const';

import { mapArray } from '@/shared/utils/array-util';
import { isNullOrEmpty } from '@/shared/utils/type-utils';

const SelectControl: FC<SelectControlComponentProps> = forwardRef<
  HTMLSelectElement,
  SelectControlComponentProps
>(
  (
    {
      options = [],
      placeholder = 'Please select',
      defaultValue = 'default-placeholder',
      className,
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <select
        ref={ref}
        defaultValue={isNullOrEmpty(value) ? defaultValue : undefined}
        className={clsx('select select-bordered', className, 'w-full')}
        value={value}
        {...props}
      >
        {placeholder && (
          <option value="default-placeholder" disabled>
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
