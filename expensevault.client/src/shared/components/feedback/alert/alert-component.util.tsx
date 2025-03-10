import { ReactNode } from 'react';

import InfoIcon from '../../../icons/error-icon';
import ErrorIcon from '../../../icons/error-icon';
import SuccessIcon from '../../../icons/success-icon';
import WarningIcon from '../../../icons/warning-icon';

import { AlertType } from './alert-component.const';

export const alertIconMap: Record<AlertType, ReactNode> = {
  success: <SuccessIcon />,
  alert: <InfoIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
  error: <ErrorIcon />,
};
