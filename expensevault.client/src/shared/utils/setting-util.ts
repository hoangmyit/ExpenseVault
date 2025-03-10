import { SettingEnv } from '../types/common/setting';

export const SETTING_ENV: SettingEnv = {
  mockData: import.meta.env.VITE_MOCK_DATA === 'true',
  apiUrl: import.meta.env.VITE_API_URL,
  env: import.meta.env.VITE_ENV,
  consoleLog: import.meta.env.VITE_CONSOLE_LOG === 'true',
};
