import { ReactNode } from 'react';

import {
  HorizontalPosition,
  VerticalPosition,
} from '../../model/common/position';
import { AlertType } from '../alert/alert-component.const';

export type ToastProps = {
  id: string;
  message: string | ReactNode;
  type: AlertType;
  duration?: number;
};

export type ToastContainerProps = {
  toasts: ToastProps[];
  horizontal?: HorizontalPosition;
  vertical?: VerticalPosition;
  onClose: onToastClose;
};

export type onToastClose = (id: string) => void;

export type ToastEventPayload = {
  message: string;
  type: AlertType;
  duration?: number;
};

export const TOAST_EVENT = 'app:toast';

export const toastPositionMap: Record<
  HorizontalPosition | VerticalPosition,
  string
> = {
  start: 'toast-start',
  center: 'toast-center',
  end: 'toast-end',
  top: 'toast-top',
  middle: 'toast-middle',
  bottom: 'toast-bottom',
};
