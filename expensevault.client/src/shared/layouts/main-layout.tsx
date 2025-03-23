import { FC } from 'react';
import { Outlet } from 'react-router';

const MainLayout: FC = () => {
  return (
    <div>
      <aside>Example sidebar</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
