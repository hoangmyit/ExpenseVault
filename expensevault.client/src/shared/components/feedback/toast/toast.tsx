import { FC, useEffect } from 'react';

import clsx from 'clsx';

import { alertClassMap } from '../alert/alert-component.const';
import { alertIconMap } from '../alert/alert-component.util';

import {
  onToastClose,
  ToastContainerProps,
  toastPositionMap,
  ToastProps,
} from './toast.const';

const Toast: FC<ToastProps & { onClose: onToastClose }> = ({
  id,
  message,
  type,
  duration = 500,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, id, onClose]);
  return (
    <div
      className={clsx(
        'alert alert-vertical sm:alert-horizontal',
        alertClassMap[type],
      )}
    >
      <span>{alertIconMap[type]} </span>
      <span>{message}</span>
      {onClose && <button onClick={() => onClose(id)}>Close</button>}
    </div>
  );
};

const ToastContainer: FC<ToastContainerProps> = ({
  toasts,
  onClose,
  horizontal = 'end',
  vertical = 'top',
}) => {
  return (
    <div
      className={clsx(
        'toast',
        toastPositionMap[vertical],
        toastPositionMap[horizontal],
        'translate-y-0 transform opacity-100 transition-all duration-300',
      )}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastContainer;
