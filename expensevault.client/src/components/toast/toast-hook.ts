import { useContext, useEffect } from 'react';

import { TOAST_EVENT, ToastEventPayload } from './toast.const';
import { ToastContext } from './toast-context';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const useToastEvents = () => {
  const { showToast } = useToast();

  useEffect(() => {
    const handleToastEvent = (event: CustomEvent<ToastEventPayload>) => {
      const { message, type, duration } = event.detail;
      showToast(message, type, duration);
    };

    document.addEventListener(TOAST_EVENT, handleToastEvent as EventListener);

    return () => {
      document.removeEventListener(
        TOAST_EVENT,
        handleToastEvent as EventListener,
      );
    };
  }, [showToast]);
};
