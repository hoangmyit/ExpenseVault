import { toast, ToastOptions } from 'react-toastify';

import { getCurrentTheme } from '@/shared/utils/common-util';

export const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: getCurrentTheme() === 'dark' ? 'dark' : 'light',
  className: 'daisyui-toast',
};

const getToastOptions = (options?: ToastOptions): ToastOptions => ({
  ...toastConfig,
  ...options,
  theme: getCurrentTheme() === 'dark' ? 'dark' : 'light',
});

// Convenience methods for common toast types
export const toastSuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, { ...toastConfig, ...getToastOptions(options) });

export const toastError = (message: string, options?: ToastOptions) =>
  toast.error(message, { ...toastConfig, ...getToastOptions(options) });

export const toastWarning = (message: string, options?: ToastOptions) =>
  toast.warning(message, { ...toastConfig, ...getToastOptions(options) });

export const toastInfo = (message: string, options?: ToastOptions) =>
  toast.info(message, { ...toastConfig, ...getToastOptions(options) });
