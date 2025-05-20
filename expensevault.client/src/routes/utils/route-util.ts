import { RouteChangeEvent, RouteChangeEventName } from '../types';

import { dispatchWindowEvent } from '@/shared/utils/event-util';

export const navigateTo = (eventName: string, path: string) => {
  const navigationEvent: RouteChangeEvent = {
    redirectTo: path,
    type: eventName,
  };
  dispatchWindowEvent(RouteChangeEventName, navigationEvent);
};
