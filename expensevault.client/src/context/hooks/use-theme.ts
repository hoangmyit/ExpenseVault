import { useContext } from 'react';

import { ThemeContext } from '../theme-context';

import { throwTypeErrorIf } from '@/shared/utils/common-util';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  throwTypeErrorIf(
    context === undefined,
    'useTheme must be used within a ThemeProvider',
  );
  return context;
};
