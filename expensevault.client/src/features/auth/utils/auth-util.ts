import { jwtDecode } from 'jwt-decode';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/token.const';
import { MyJwtPayload } from '../types/token.type';

import { AuthUser } from '@/shared/types/common';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/shared/utils/common-util';
import { isArray } from '@/shared/utils/type-utils';

export const setAuthToken = (token: string) =>
  setLocalStorageItem(ACCESS_TOKEN, token);
export const getAuthToken = () => getLocalStorageItem(ACCESS_TOKEN);
export const removeAuthToken = () => removeLocalStorageItem(ACCESS_TOKEN);

export const setRefreshToken = (token: string) =>
  setLocalStorageItem(REFRESH_TOKEN, token);
export const getRefreshToken = () => getLocalStorageItem(REFRESH_TOKEN);
export const removeRefreshToken = () => removeLocalStorageItem(REFRESH_TOKEN);

export const isAuthenticated = () => !!getAuthToken();
export const getAuthInfo = (): AuthUser | null => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }
  const info = jwtDecode<MyJwtPayload>(token);
  return {
    email: info.email,
    id: info.sub as string,
    name: info.unique_name as string,
    role: isArray(info.role) ? (info.role as string[]) : [info.role as string],
    token: token,
  };
};
