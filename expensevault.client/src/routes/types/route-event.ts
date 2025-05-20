export type RouteChangeEvent = {
  redirectTo: string;
  type: string;
};

export const RouteChangeEventName = 'route_change';
export const RouteChangeType_AuthUnauthorized = 'auth:unauthorized';
export const RouteChangeType_AuthForbidden = 'auth:forbidden';
