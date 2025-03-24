import { createContext } from 'react';

import { SidebarContextType } from './types/sidebar-context.type';

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);
