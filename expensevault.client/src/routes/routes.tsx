import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import FunctionLayout from '../layouts/function-layout';
import ErrorPage from '../pages/common/error-page/error-page';
import {
  ErrorCode,
  ErrorPageData,
} from '../pages/common/error-page/error-page.const';
import HomePage from '../pages/home/home';
import SignInPage from '../pages/sign-in/sign-in';
import SignUpPage from '../pages/sign-up/sign-up';

const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-up" replace />} />
      <Route path="/dashboard" element={<HomePage />} />
      <Route element={<FunctionLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
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
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
