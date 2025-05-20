import { SETTING_ENV } from '@/configs/environment';
import { Theme } from '@/context/types/theme-context.type';

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

export const setLocalStorageItem = (key: string, value: string): void =>
  localStorage.setItem(key, value);

export const getLocalStorageItem = (key: string): string | null =>
  localStorage.getItem(key);

export const removeLocalStorageItem = (key: string): void =>
  localStorage.removeItem(key);

export const getCurrentTheme = (): Theme => {
  const theme = getLocalStorageItem('theme') as Theme;
  return theme || 'light';
};

export const setAppTheme = (theme: Theme): void =>
  document.documentElement.setAttribute('data-theme', theme);
