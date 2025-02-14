import classnames from 'classnames';
import { FC, ReactNode } from 'react';

import ErrorIcon from '../../icons/error-icon';
import InfoIcon from '../../icons/info-icon';
import SuccessIcon from '../../icons/success-icon';
import WarningIcon from '../../icons/warning-icon';
import { AlertComponentProps, AlertType } from './alert-component.const';

const alertIconMap: Record<AlertType, ReactNode> = {
  success: <SuccessIcon />,
  alert: <InfoIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
  error: <ErrorIcon />,
};

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
        `alert-${type}`,
      )}
    >
      {alertIconMap[type]}
      {typeof message === 'string' ? <span>{message}</span> : message}
      {children}
    </div>
  );
};

export default AlertComponent;
