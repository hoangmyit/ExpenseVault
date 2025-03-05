import { createContext, ReactNode } from 'react';

import { AlertType } from '../alert/alert-component.const';

type ToastContextType = {
  showToast: (
    message: string | ReactNode,
    type: AlertType,
    duration?: number,
  ) => string;
  hideToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
