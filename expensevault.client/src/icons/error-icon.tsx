import { FC } from 'react';

import clsx from 'clsx';

import { IconProps } from './icon-props';

const InfoIcon: FC<IconProps> = ({
  className = 'shrink-0',
  color = 'stroke-current',
  height = 'h-6',
  width = 'w-6',
  fill = 'none',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      className={clsx(color, height, width, className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default InfoIcon;
