import { FC } from 'react';

import MainRoutes from './routes/routes';
import { useToastEvents } from './shared/components/feedback/toast/toast-hook';
import { ToastProvider } from './shared/components/feedback/toast/toast-provider';

import './App.css';

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
