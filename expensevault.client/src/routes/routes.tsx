import { FC } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';

import FunctionLayout from '../layouts/function-layout';
import CategoriesPage from '../pages/category/categories-page';
import CategoryPage from '../pages/category/category-page';
import ErrorPage from '../pages/common/error-page/error-page';
import {
  ErrorCode,
  ErrorPageData,
} from '../pages/common/error-page/error-page.const';
import HomePage from '../pages/home/home';
import SignInPage from '../pages/sign-in/sign-in';
import { AuthState } from '../pages/sign-in/store/auth-slice';
import SignUpPage from '../pages/sign-up/sign-up';
import { useAppSelector } from '../stores/hooks';

const ProtectedRoutes: FC<{
  element: React.ReactElement;
  requiredRoles?: string[];
}> = ({ element, requiredRoles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, data: user } = useAppSelector(AuthState);
  const userRoles = user?.role || [];

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={location} replace />;
  }

  if (requiredRoles.length > 0) {
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/forbidden" replace />;
    }
  }
  return element;
};

const PublicOnlyRoute: FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAppSelector(AuthState);
  const location = useLocation();
  if (isAuthenticated) {
    const from = location.state?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }
  return element;
};

const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoutes element={<HomePage />} />}
      />
      <Route
        path="/category"
        element={<ProtectedRoutes element={<CategoriesPage />} />}
      />
      <Route
        path="/category/:id"
        element={<ProtectedRoutes element={<CategoryPage />} />}
      />
      <Route element={<FunctionLayout />}>
        <Route
          path="/sign-in"
          element={<PublicOnlyRoute element={<SignInPage />} />}
        />
        <Route
          path="/sign-up"
          element={<PublicOnlyRoute element={<SignUpPage />} />}
        />
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
