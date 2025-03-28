import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ROUTE_PATHS } from '../constants/route-paths';
import {
  RouteChangeEvent,
  RouteChangeEventName,
  RouteChangeType_AuthForbidden,
  RouteChangeType_AuthUnauthorized,
} from '../types';

import { addWindowEventListener } from '@/shared/utils/event-util';

export const useRouteEvent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRouteEvent = (data: RouteChangeEvent) => {
      const { redirectTo, type } = data;

      if (type === RouteChangeType_AuthUnauthorized) {
        navigate(ROUTE_PATHS.SIGN_IN, { replace: true });
      } else if (type === RouteChangeType_AuthForbidden) {
        navigate(ROUTE_PATHS.FORBIDDEN, { replace: true });
      } else if (redirectTo) {
        navigate(redirectTo);
      }
    };

    const routeEventUnsubscribe = addWindowEventListener(
      RouteChangeEventName,
      handleRouteEvent,
    );

    return () => {
      routeEventUnsubscribe();
    };
  }, [navigate]);
};
