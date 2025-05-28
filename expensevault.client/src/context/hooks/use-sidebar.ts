import { useContext } from 'react';

import { SidebarContext } from '../sidebar-context';

import { throwTypeErrorIf } from '@/shared/utils/common-util';
import { isNullOrUndefined } from '@/shared/utils/type-utils';

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  throwTypeErrorIf(
    isNullOrUndefined(context),
    'useSidebar must be used within a SidebarProvider',
  );
  return context;
};
