import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import AlertComponent from '../alert/alert-component';
import { onToastClose, ToastProps } from './toast.const';

const Toast: FC<ToastProps & { onClose: onToastClose }> = ({
  id,
  message,
  type,
  duration,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration || 3000);
    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  return (
    <div className="translate-y-0 transform opacity-100 transition-all duration-300">
      <AlertComponent
        message={message}
        type={type}
        key={id}
        classNames="mb-2 cursor-pointer shadow-lg"
      >
        {onClose && <button onClick={() => onClose(id)}>Close</button>}
      </AlertComponent>
    </div>
  );
};

const ToastContainer: FC<{ toasts: ToastProps[]; onClose: onToastClose }> = ({
  toasts,
  onClose,
}) => {
  return createPortal(
    <div className="toast-container fixed top-4 right-4 z-50 flex max-w-xs flex-col gap-2">
      {toasts &&
        toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
