import './index.css';

import React from 'react';
import { Outlet } from 'react-router';

const FunctionLayout: React.FC = () => {
  return (
    <>
      <div className="square-box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="v-full bg-primary flex h-screen flex-col justify-center">
        <Outlet />
      </div>
    </>
  );
};

export default FunctionLayout;
