import { FC } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';

import SignInPage from '../features/auth/sign-in/sign-in';
import { AuthState } from '../features/auth/sign-in/store/auth-slice';
import SignUpPage from '../features/auth/sign-up/sign-up';
import CategoriesPage from '../features/category/categories-page';
import CategoryPage from '../features/category/category-page';
import ErrorPage from '../features/error-page/error-page';
import {
  ErrorCode,
  ErrorPageData,
} from '../features/error-page/error-page.const';
import HomePage from '../features/home/home';
import FunctionLayout from '../shared/layouts/function-layout';
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
