import { SETTING_ENV } from './setting-util';

export const getErrorMessage = (error: unknown, defaultMsg: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMsg;
};

export const ConsoleLog = (...args: unknown[]): void => {
  if (SETTING_ENV.consoleLog) {
    console.log(...args);
  }
};
