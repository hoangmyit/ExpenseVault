import { forwardRef } from 'react';

import clsx from 'clsx';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ startDecorator, endDecorator, className, ...props }, ref) => {
    return (
      <label className={clsx('input', className)}>
        {startDecorator}
        <input ref={ref} {...props} />
        {endDecorator}
      </label>
    );
  },
);

Input.displayName = 'Input';

export default Input;
