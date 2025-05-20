import { useEffect, useState } from 'react';

import { Theme } from './types/theme-context.type';
import { ThemeContext } from './theme-context';

import {
  getCurrentTheme,
  setAppTheme,
  setLocalStorageItem,
} from '@/shared/utils/common-util';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme());

  useEffect(() => {
    setAppTheme(theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setLocalStorageItem('theme', newTheme);
    setAppTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
