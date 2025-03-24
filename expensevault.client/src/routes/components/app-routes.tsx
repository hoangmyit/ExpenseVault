import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import {
  errorRoutes,
  protectedRoutes,
  publicRoutes,
} from '../configs/route-config';
import { ROUTE_PATHS } from '../constants/route-paths';
import { useRouteEvent } from '../hooks/use-route-event';

import { ProtectedRoute, PublicOnlyRoute } from './route-guards';

import ErrorPage from '@/features/error-page/error-page';
import { ErrorPageData } from '@/features/error-page/error-page.const';
import { AppLayout } from '@/shared/layouts/app-layout';
import FunctionLayout from '@/shared/layouts/function-layout';

const AppRoutes: FC = () => {
  useRouteEvent();

  return (
    <Routes>
      <Route
        path={ROUTE_PATHS.ROOT}
        element={<Navigate to={ROUTE_PATHS.SIGN_IN} replace />}
      />

      {/* Protected Routes */}
      <Route element={<AppLayout />}>
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute
                element={route.element}
                requiredPermissions={route.requiredRoles}
              />
            }
          />
        ))}
      </Route>

      {/* Public and Error Routes */}
      <Route element={<FunctionLayout />}>
        {/* Public Routes */}
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PublicOnlyRoute element={route.element} />}
          />
        ))}

        {/* Error Routes */}
        {errorRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ErrorPage {...ErrorPageData[route.errorCode]} />}
          />
        ))}

        {/* Catch-all route */}
        <Route
          path="*"
          element={<Navigate to={ROUTE_PATHS.NOT_FOUND} replace />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
