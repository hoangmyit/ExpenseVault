import { toast, ToastOptions } from 'react-toastify';

// Helper function to trigger toast events from anywhere
export const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: false,
  hideProgressBar: false, // Keep progress bar
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
};

// Convenience methods for common toast types
export const toastSuccess = (message: string) =>
  toast.success(message, toastConfig);

export const toastError = (message: string) =>
  toast.error(message, toastConfig);
export const toastWarning = (message: string) =>
  toast.warning(message, toastConfig);

export const toastInfo = (message: string) => toast.info(message, toastConfig);
