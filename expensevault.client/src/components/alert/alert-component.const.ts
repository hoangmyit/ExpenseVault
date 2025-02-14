import { ReactNode } from 'react';

export type AlertComponentProps = {
  message: string | ReactNode;
  classNames?: string;
  type: AlertType;
  children?: ReactNode;
};

export type AlertType = 'success' | 'alert' | 'warning' | 'info' | 'error';
