import { FC } from 'react';
import { Navigate, useLocation } from 'react-router';

import { ROUTE_PATHS } from '../constants/route-paths';

import { useAuth } from '@/features/auth/hooks/use-auth';

/**
 * Component that protects routes requiring authentication
 * and optionally specific roles
 */
export const ProtectedRoute: FC<{
  element: React.ReactElement;
  requiredRoles?: string[];
}> = ({ element, requiredRoles = [] }) => {
  const location = useLocation();
  const { authnData } = useAuth();
  const { isAuthenticated, data: user } = authnData;
  const userRoles = user?.role || [];

  // Check authentication
  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTE_PATHS.SIGN_IN} state={{ from: location }} replace />
    );
  }

  // Check roles if specified
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) =>
      userRoles.includes(role),
    );
    if (!hasRequiredRole) {
      return <Navigate to={ROUTE_PATHS.FORBIDDEN} replace />;
    }
  }

  return element;
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
    const from = location.state?.from?.pathname || ROUTE_PATHS.DASHBOARD;
    return <Navigate to={from} replace />;
  }

  return element;
};
