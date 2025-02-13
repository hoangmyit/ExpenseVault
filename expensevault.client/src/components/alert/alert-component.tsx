import classnames from 'classnames';
import { FC } from 'react';

import { AlertComponentProps } from './alert-component.const';
import { alert_container } from './alert-component.module.scss';

const AlertComponent: FC<AlertComponentProps> = ({
  classNames,
  message,
  title,
  type,
}) => {
  return (
    <div
      className={classnames(`alert alert-${type}`, alert_container, classNames)}
    >
      <strong>{title}</strong>
      {message}
    </div>
  );
};

export default AlertComponent;
