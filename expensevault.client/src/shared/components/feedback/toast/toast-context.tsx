import { createContext } from 'react';
import { ToastPosition } from 'react-toastify';

type ToastContextType = {
  position: ToastPosition;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
