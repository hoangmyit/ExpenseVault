import { jwtDecode } from 'jwt-decode';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/token.const';
import { MyJwtPayload } from '../types/token.type';

import { AuthUser } from '@/shared/types/common';
import { isArray } from '@/shared/utils/type-utils';

export const setAuthUser = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN, token);
export const getAuthUser = () => localStorage.getItem(ACCESS_TOKEN);
export const removeAuthUser = () => localStorage.removeItem(ACCESS_TOKEN);

export const setRefreshToken = (token: string) =>
  localStorage.setItem(REFRESH_TOKEN, token);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
export const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN);

export const isAuthenticated = () => !!getAuthUser();
export const getAuthInfo = (): AuthUser | null => {
  const token = getAuthUser();
  if (!token) {
    return null;
  }
  const info = jwtDecode<MyJwtPayload>(token);
  return {
    email: info.email,
    id: info.jti as string,
    name: info.sub as string,
    role: isArray(info.role) ? (info.role as string[]) : [info.role as string],
    token: token,
  };
};
