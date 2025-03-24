import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ROUTE_PATHS } from '../constants/route-paths';
import {
  RouteChangeEvent,
  RouteChangeEventName,
  RouteChangeType_AuthForbidden,
  RouteChangeType_AuthUnauthorized,
} from '../types';

export const useRouteEvent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRouteEvent = (event: CustomEvent<RouteChangeEvent>) => {
      const { redirectTo, type } = event.detail;

      if (type === RouteChangeType_AuthUnauthorized) {
        navigate(ROUTE_PATHS.SIGN_IN, { replace: true });
      } else if (type === RouteChangeType_AuthForbidden) {
        navigate(ROUTE_PATHS.FORBIDDEN, { replace: true });
      } else if (redirectTo) {
        navigate(redirectTo);
      }
    };

    window.addEventListener(
      RouteChangeEventName,
      handleRouteEvent as EventListener,
    );

    return () => {
      window.removeEventListener(
        RouteChangeEventName,
        handleRouteEvent as EventListener,
      );
    };
  }, [navigate]);
};
