import { FC, forwardRef } from 'react';

import clsx from 'clsx';

import SelectControl from '../../ui/select-control';
import FormField from '../form-field';

import { FormSelectProps } from './form-select.const';

const FormSelect: FC<FormSelectProps> = forwardRef<
  HTMLSelectElement,
  FormSelectProps
>(({ label, error, helper, options, className, ...props }, ref) => {
  return (
    <FormField label={label} error={error} helper={helper}>
      <SelectControl
        options={options}
        ref={ref}
        className={clsx(className, error && 'select-error')}
        {...props}
      />
    </FormField>
  );
});

FormSelect.displayName = 'FormSelect';
export default FormSelect;
