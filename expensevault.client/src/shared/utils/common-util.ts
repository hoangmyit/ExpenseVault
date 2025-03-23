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

export const setLocalStorageItem = (key: string, value: string): void =>
  localStorage.setItem(key, value);

export const getLocalStorageItem = (key: string): string | null =>
  localStorage.getItem(key);

export const removeLocalStorageItem = (key: string): void =>
  localStorage.removeItem(key);
