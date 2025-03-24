import { FC } from 'react';

import AppLayoutContent from './app-layout-content';

import { SidebarProvider } from '@/context/sidebar-provider';

const AppLayout: FC = () => {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
