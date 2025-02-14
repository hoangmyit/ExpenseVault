import classnames from 'classnames';
import { FC } from 'react';

import { AlertComponentProps } from './alert-component.const';

const AlertComponent: FC<AlertComponentProps> = ({
  classNames,
  message,
  title,
  type,
}) => {
  return (
    <div className={classnames(`alert alert-${type}`, classNames)}>
      <strong>{title}</strong>
      {message}
    </div>
  );
};

export default AlertComponent;
