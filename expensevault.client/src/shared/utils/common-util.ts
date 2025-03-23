import { SETTING_ENV } from '../../configs/environment';

export const getErrorMessage = (error: unknown, defaultMsg: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMsg;
};

export const consoleLog = (...args: unknown[]): void => {
  if (SETTING_ENV.consoleLog) {
    console.log(...args);
  }
};

export const dispatchEvent = (event: CustomEvent): boolean =>
  window.dispatchEvent(event);
