import { RouteChangeEvent } from '../types/route-event.type';

export const navigateTo = (eventName: string, path: string) => {
  const navigationEvent = new CustomEvent<RouteChangeEvent>('route_change', {
    detail: { redirectTo: path, type: eventName },
  });
  window.dispatchEvent(navigationEvent);
};
