import { useEffect } from 'react';
import { RouteChangeEvent } from '../types/route-event.type';

export const useRouteEvent = () => {
  useEffect(() => {
    const handleRouteEvent = (event: CustomEvent<RouteChangeEvent>) => {
  }, []);
};

