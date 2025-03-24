import { RouteChangeEvent, RouteChangeEventName } from '../types';

export const navigateTo = (eventName: string, path: string): boolean => {
  const navigationEvent = new CustomEvent<RouteChangeEvent>(
    RouteChangeEventName,
    {
      detail: { redirectTo: path, type: eventName },
    },
  );
  return dispatchEvent(navigationEvent);
};
