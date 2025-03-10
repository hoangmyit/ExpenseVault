import { jwtDecode } from 'jwt-decode';

import { AuthUser } from '../types/common';

export const setAuthUser = (token: string) =>
  localStorage.setItem('auth_token', token);

export const getAuthUser = () => localStorage.getItem('auth_token');
export const removeAuthUser = () => localStorage.removeItem('auth_token');
export const setRefreshToken = (token: string) =>
  localStorage.setItem('refresh_token', token);
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const removeRefreshToken = () =>
  localStorage.removeItem('refresh_token');

export const isAuthenticated = () => !!getAuthUser();
export const getAuthInfo = (): AuthUser | null => {
  const token = getAuthUser();
  if (!token) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const info = jwtDecode(token) as any;
  return {
    email: info.email,
    id: info.unique_name,
    name: info.sub,
    role: typeof info.role === 'string' ? [info.role] : info.role,
    token: token,
  };
};
