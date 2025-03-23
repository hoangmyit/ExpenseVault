import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import {
  RouteChangeEvent,
  RouteChangeEventName,
  RouteChangeType_AuthForbidden,
  RouteChangeType_AuthUnauthorized,
} from '../types/route-event.type';

export const useRouteEvent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRouteEvent = (event: CustomEvent<RouteChangeEvent>) => {
      const { redirectTo, type } = event.detail;

      if (type === RouteChangeType_AuthUnauthorized) {
        navigate('/sign-in', { replace: true });
      } else if (type === RouteChangeType_AuthForbidden) {
        navigate('/forbidden', { replace: true });
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
