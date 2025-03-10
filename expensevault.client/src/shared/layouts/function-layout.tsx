import React from 'react';
import { Outlet } from 'react-router';

import './index.css';

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
      <div className="function-page-container v-full bg-primary flex h-screen justify-center">
        <Outlet />
      </div>
    </>
  );
};

export default FunctionLayout;
