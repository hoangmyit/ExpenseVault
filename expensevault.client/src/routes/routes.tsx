import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import ErrorPage from '../pages/common/error-page/error-page';
import {
  ErrorCode,
  ErrorPageData,
} from '../pages/common/error-page/error-page.const';
import HomePage from '../pages/home/home';

const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
      <Route
        path="/unauthorized"
        element={<ErrorPage {...ErrorPageData[ErrorCode.UNAUTHORIZED]} />}
      />
      <Route
        path="/forbidden"
        element={<ErrorPage {...ErrorPageData[ErrorCode.FORBIDDEN]} />}
      />
      <Route
        path="/server-error"
        element={<ErrorPage {...ErrorPageData[ErrorCode.SERVER_ERROR]} />}
      />
      <Route
        path="/not-found"
        element={<ErrorPage {...ErrorPageData[ErrorCode.NOT_FOUND]} />}
      />
    </Routes>
  );
};

export default MainRoutes;
