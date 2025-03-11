import { FC } from 'react';

import clsx from 'clsx';

import { IconProps } from './icon-props';

export const InfoIcon: FC<IconProps> = ({
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
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );
};
