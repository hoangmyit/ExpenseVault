import React from 'react';
import { Link, useLocation } from 'react-router';

import { ErrorPageProps } from './error-page.const';

const ErrorPage: React.FC<ErrorPageProps> = ({
  code,
  description,
  message,
  title,
}) => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-[20px] text-center">
      <div className="w-full">
        <div className="mt-auto ml-auto text-center">
          <div className="my-6 flex h-full items-center justify-center">
            <div className="shrink-1">
              <h1 className="text-[105px] leading-none font-bold text-white">
                {code}
                <span className="text-2xl">error</span>
              </h1>
              <h2 className="mt-[20px] mb-[15px] text-[1.65rem] font-medium tracking-[-0.5px] text-white">
                {title}
              </h2>
              <h6 className="mb-[40px] text-white opacity-[0.6]">
                {description}
              </h6>
              {message && <p className="error-custom-message">{message}</p>}
              <Link className="btn" to={'/dashboard'}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
