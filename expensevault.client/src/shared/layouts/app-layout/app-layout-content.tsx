import { FC } from 'react';
import { Outlet } from 'react-router';

import clsx from 'clsx';

import Backdrop from './app-backdrop';
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';

import { useSidebar } from '@/context/hooks/use-sidebar';

const AppLayoutContent: FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="bg-base-300 min-h-screen xl:flex">
      <div>
        <AppSidebar />
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
        <div className="rounded-box bg-base-100 m-4 mx-auto h-[calc(100vh-95px)] shadow-lg md:mx-4 md:h-[calc(100vh-120px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayoutContent;
