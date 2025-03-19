import React from 'react';

import clsx from 'clsx';

import { SvgIconProps } from './icon-props';

const SvgIcon: React.FC<SvgIconProps> = ({
  height = 'h-6',
  width = 'w-6',
  color = 'currentColor',
  fill = 'none',
  className,
  icon: Icon,
  ...props
}) => {
  return (
    <Icon
      className={clsx(height, width, className)}
      stroke={color}
      fill={fill}
      {...props}
    />
  );
};

export default SvgIcon;
