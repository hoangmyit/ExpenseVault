import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import MainRoutes from './routes/routes';

import './App.css';

const App: FC = () => {
  return (
    <>
      <MainRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
