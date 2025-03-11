import { FC } from 'react';

import clsx from 'clsx';

import { IconProps } from './icon-props';

export const SuccessIcon: FC<IconProps> = ({
  className = 'shrink-0 stroke-current',
  color = 'currentColor',
  height = 'h-6',
  width = 'w-6',
  fill = 'none',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(height, width, className)}
      stroke={color}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
