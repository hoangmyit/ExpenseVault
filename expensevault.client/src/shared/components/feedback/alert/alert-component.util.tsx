import { ReactNode } from 'react';

import { AlertType } from './alert-component.const';

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '@/icons';

export const alertIconMap: Record<AlertType, ReactNode> = {
  success: <SuccessIcon />,
  alert: <InfoIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
  error: <ErrorIcon />,
};
