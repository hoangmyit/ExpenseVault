import { ReactNode } from 'react';

export type AlertComponentProps = {
  message: string | ReactNode;
  classNames?: string;
  type: AlertType;
  children?: ReactNode;
};

export const alertClassMap: Record<AlertType, string> = {
  success: 'alert-success',
  alert: 'alert-alert',
  warning: 'alert-warning',
  info: 'alert-info',
  error: 'alert-error',
};

export type AlertType = 'success' | 'alert' | 'warning' | 'info' | 'error';
