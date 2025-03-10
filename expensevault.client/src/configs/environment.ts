import { SettingEnv } from '../shared/types/common/setting';

export const SETTING_ENV: SettingEnv = {
  mockData: import.meta.env.VITE_MOCK_DATA === 'true',
  apiUrl: import.meta.env.VITE_API_URL,
  environment: import.meta.env.MODE,
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
  consoleLog: import.meta.env.VITE_CONSOLE_LOG === 'true',
} as const;
