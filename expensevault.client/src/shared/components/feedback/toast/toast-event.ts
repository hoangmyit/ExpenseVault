import { TOAST_EVENT, ToastEventPayload } from './toast.const';

// Helper function to trigger toast events from anywhere
export const triggerToast = (payload: ToastEventPayload) => {
  const event = new CustomEvent(TOAST_EVENT, {
    detail: payload,
  });
  document.dispatchEvent(event);
};

// Convenience methods for common toast types
export const toastSuccess = (message: string, duration?: number) =>
  triggerToast({ message, type: 'success', duration });

export const toastError = (message: string, duration?: number) =>
  triggerToast({ message, type: 'error', duration });

export const toastWarning = (message: string, duration?: number) =>
  triggerToast({ message, type: 'warning', duration });

export const toastInfo = (message: string, duration?: number) =>
  triggerToast({ message, type: 'info', duration });
