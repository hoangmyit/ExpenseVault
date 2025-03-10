import { ReactNode, useCallback, useState } from 'react';

import { v4 } from 'uuid';

import { AlertType } from '../alert/alert-component.const';

import ToastContainer from './toast';
import { ToastProps } from './toast.const';
import { ToastContext } from './toast-context';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback(
    (message: string | ReactNode, type: AlertType, duration?: number) => {
      const id = v4();
      setToasts((prev) => [...prev, { id, message, type, duration }]);
      return id;
    },
    [],
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
};
