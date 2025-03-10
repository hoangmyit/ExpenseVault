import './App.css';

import { FC } from 'react';

import MainRoutes from './routes/routes';
import { useToastEvents } from './shared/components/toast/toast-hook';
import { ToastProvider } from './shared/components/toast/toast-provider';

const ToastListener: FC = () => {
  useToastEvents();
  return null;
};

const App: FC = () => {
  return (
    <ToastProvider>
      <ToastListener />
      <MainRoutes />
    </ToastProvider>
  );
};

export default App;
