import { useEffect, useState } from 'react';

import { Theme } from './types/theme-context.type';
import { ThemeContext } from './theme-context';

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/shared/utils/common-util';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // This code will only run on the client side
    const savedTheme = getLocalStorageItem('theme') as Theme | null;
    const initialTheme = savedTheme || 'light'; // Default to light theme

    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setLocalStorageItem('theme', newTheme);
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    setIsInitialized(false);
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    // setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    setIsInitialized(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
