import './index.css';

import React, { ReactNode } from 'react';

const FunctionLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
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
        {children}
      </div>
    </>
  );
};

export default FunctionLayout;
