import { FC } from 'react';
import { Outlet } from 'react-router';

export const PageLayout: FC = () => {
  return (
    <div>
      <aside>Example sidebar</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
