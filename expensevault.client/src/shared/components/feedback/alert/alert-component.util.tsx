import { ReactNode } from 'react';

import { AlertType } from './alert-component.const';

import { ErrorIcon, InfoCircleIcon, SuccessIcon, WarningIcon } from '@/icons';

export const alertIconMap: Record<AlertType, ReactNode> = {
  success: <SuccessIcon />,
  alert: <InfoCircleIcon />,
  warning: <WarningIcon />,
  info: <InfoCircleIcon />,
  error: <ErrorIcon />,
};
