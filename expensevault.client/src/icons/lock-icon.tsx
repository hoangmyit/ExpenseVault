import { FC } from 'react';

import clsx from 'clsx';

import { IconProps } from './icon-props';

export const LockIcon: FC<IconProps> = ({
  className = 'shrink-0 stroke-current',
  color = 'currentColor',
  height = 'h-6',
  width = 'w-6',
  fill = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(height, width, className)}
      viewBox="0 0 24 24"
      strokeWidth="2.5px"
      fill={fill}
      color={color}
    >
      <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z" />
    </svg>
  );
};
