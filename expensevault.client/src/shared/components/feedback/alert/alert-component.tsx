import { FC } from 'react';

import classnames from 'classnames';

import { alertClassMap, AlertComponentProps } from './alert-component.const';
import { alertIconMap } from './alert-component.util';

const AlertComponent: FC<AlertComponentProps> = ({
  classNames,
  message,
  type,
  children,
}) => {
  return (
    <div
      role="alert"
      className={classnames(
        'alert alert-vertical sm:alert-horizontal',
        classNames,
        alertClassMap[type],
      )}
    >
      {alertIconMap[type]}
      {typeof message === 'string' ? <span>{message}</span> : message}
      {children}
    </div>
  );
};

export default AlertComponent;
