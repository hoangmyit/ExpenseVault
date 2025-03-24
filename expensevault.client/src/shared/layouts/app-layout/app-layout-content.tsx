import { FC } from 'react';
import { Outlet } from 'react-router';

import clsx from 'clsx';

import Backdrop from './app-backdrop';
import AppHeader from './app-header';

import { useSidebar } from '@/context/hooks/use-sidebar';

const AppLayoutContent: FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        {/* <AppSidebar />*/}
        <Backdrop />
      </div>
      <div
        className={clsx(
          'flex-1 transition-all duration-300 ease-in-out',
          isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]',
          isMobileOpen && 'ml-0',
        )}
      >
        <AppHeader />
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayoutContent;
