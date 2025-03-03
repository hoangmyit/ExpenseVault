import { ReactNode } from 'react';

import { AlertType } from '../alert/alert-component.const';

export type ToastProps = {
  id: string;
  message: string | ReactNode;
  type: AlertType;
  duration?: number;
};

export type onToastClose = (id: string) => void;
