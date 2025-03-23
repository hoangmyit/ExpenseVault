import { toast, ToastOptions } from 'react-toastify';

// Helper function to trigger toast events from anywhere
export const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  className: 'daisyui-toast',
};

// Convenience methods for common toast types
export const toastSuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, { ...toastConfig, ...options });

export const toastError = (message: string, options?: ToastOptions) =>
  toast.error(message, { ...toastConfig, ...options });

export const toastWarning = (message: string, options?: ToastOptions) =>
  toast.warning(message, { ...toastConfig, ...options });

export const toastInfo = (message: string, options?: ToastOptions) =>
  toast.info(message, { ...toastConfig, ...options });
