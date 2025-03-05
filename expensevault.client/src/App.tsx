import './App.css';

import { FC } from 'react';

import { useToastEvents } from './components/toast/toast-hook';
import { ToastProvider } from './components/toast/toast-provider';
import MainRoutes from './routes/routes';

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
