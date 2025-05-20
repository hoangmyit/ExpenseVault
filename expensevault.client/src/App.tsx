import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import AppRoutes from './routes/components/app-routes';
import useGlobalEvent from './shared/hooks/use-global-event';

import './App.css';

const App: FC = () => {
  useGlobalEvent();

  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
