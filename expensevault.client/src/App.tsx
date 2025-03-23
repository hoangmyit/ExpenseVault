import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import AppRoutes from './routes/components/app-routes';

import './App.css';

const App: FC = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
