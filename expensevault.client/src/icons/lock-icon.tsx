import { FC } from 'react';

import clsx from 'clsx';

import { IconProps } from './icon-props';

export const LockIcon: FC<IconProps> = ({
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
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </g>
    </svg>
  );
};
