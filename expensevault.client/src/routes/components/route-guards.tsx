import { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import { ROUTE_PATHS } from '../constants/route-paths';

import { useAuth } from '@/features/auth/hooks/use-auth';
import usePermission from '@/features/auth/hooks/use-permission';
import { hasPermission } from '@/features/auth/utils/permission-util';
import { defaultIfNil, isNullOrEmpty } from '@/shared/utils/type-utils';

/**
 * Component that protects routes requiring authentication
 * and optionally specific roles
 */
export const ProtectedRoute: FC<{
  element: React.ReactElement;
  requiredPermissions?: string[];
}> = ({ element, requiredPermissions = [] }) => {
  const location = useLocation();
  const { authnData } = useAuth();
  const { getPermissions, permissions, status } = usePermission();
  const { isAuthenticated } = authnData;

  useEffect(() => {
    if (isAuthenticated && isNullOrEmpty(permissions) && status === 'idle') {
      getPermissions();
    }
  }, [getPermissions, isAuthenticated, permissions, status]);

  // Check authentication
  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTE_PATHS.SIGN_IN} state={{ from: location }} replace />
    );
  }

  if (
    !isNullOrEmpty(requiredPermissions) &&
    !isNullOrEmpty(permissions) &&
    hasPermission(requiredPermissions, permissions as string[])
  ) {
    return <Navigate to={ROUTE_PATHS.FORBIDDEN} replace />;
  }

  return status === 'succeeded' ? element : <div>Loading...</div>;
};

/**
 * Component that ensures routes are only accessible
 * when not authenticated (like login/signup)
 */
export const PublicOnlyRoute: FC<{
  element: React.ReactElement;
}> = ({ element }) => {
  const { authnData } = useAuth();
  const { isAuthenticated } = authnData;
  const location = useLocation();

  if (isAuthenticated) {
    const from = defaultIfNil<string>(
      location.state?.from?.pathname,
      ROUTE_PATHS.DASHBOARD,
    );
    return <Navigate to={from} replace />;
  }

  return element;
};
