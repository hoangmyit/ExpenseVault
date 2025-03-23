import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { SETTING_ENV } from '../../configs/environment';
import {
  getAuthUser,
  getRefreshToken,
  removeAuthUser,
  removeRefreshToken,
  setAuthUser,
  setRefreshToken,
} from '../../features/auth/utils/auth-util';
import { LoginResponse } from '../../shared/types/common/backend-model';
import { consoleLog } from '../../shared/utils/common-util';

import { ROUTE_PATHS } from '@/routes/constants/route-paths';
import {
  RouteChangeType_AuthForbidden,
  RouteChangeType_AuthUnauthorized,
} from '@/routes/types/route-event.type';
import { navigateTo } from '@/routes/utils/route-util';
import { isNullOrUndefined } from '@/shared/utils/type-utils';

const defaultConfig: AxiosRequestConfig = {
  baseURL: SETTING_ENV.apiUrl,
  timeout: SETTING_ENV.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

const httpClient = axios.create(defaultConfig);
const unauthenticatedHttpClient = axios.create(defaultConfig);

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(undefined);
    }
  });

  failedQueue = [];
};

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    consoleLog(error);
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt to refresh the token for 401 errors and if we haven't already tried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return httpClient(originalRequest);
          })
          .catch((err) => {
            consoleLog(err);
            return Promise.reject(err);
          });
      } else {
        // Start token refresh process
        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            removeAuthUser();
            removeRefreshToken();
            processQueue(new Error('No refresh token'));
            consoleLog(error);
            return Promise.reject(error);
          }
          const token = getAuthUser();
          // Prevent refresh token request from triggering another refresh
          const response = await unauthenticatedHttpClient.post<LoginResponse>(
            'api/auth/refresh-token',
            {
              refreshToken: refreshToken,
              token: token,
            },
          );

          if (response.data) {
            const { refreshToken: newRefreshToken, token } = response.data;
            setRefreshToken(newRefreshToken);
            setAuthUser(token);
            originalRequest.headers.Authorization = `Bearer ${token}`;

            // Process all queued requests
            processQueue(null);

            // Retry the original request
            return httpClient(originalRequest);
          } else {
            // No valid data in response
            throw new Error('Invalid refresh token response');
          }
        } catch (err) {
          removeAuthUser();
          removeRefreshToken();
          processQueue(err as Error);

          // Only redirect to login if this wasn't a background request
          if (!isNullOrUndefined(window)) {
            navigateTo(RouteChangeType_AuthUnauthorized, ROUTE_PATHS.SIGN_IN);
          }

          consoleLog(err);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    } else if (error.response?.status === 403) {
      // Forbidden
      if (!isNullOrUndefined(window)) {
        navigateTo(RouteChangeType_AuthForbidden, ROUTE_PATHS.FORBIDDEN);
      }
    }

    // For all other errors, just reject with the original error
    consoleLog(error);
    return Promise.reject(error);
  },
);

export { httpClient, unauthenticatedHttpClient };

// Improved service methods with better type safety
export const httpServiceGet = <T = unknown>(
  url: string,
  params?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => httpClient.get<T>(url, { params, ...config });

export const httpServicePost = <T = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => httpClient.post<T>(url, data, config);

export const httpServicePut = <T = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => httpClient.put<T>(url, data, config);

export const httpServiceDelete = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => httpClient.delete<T>(url, config);

export const httpServiceGetUnauthenticated = <T = unknown>(
  url: string,
  params?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> =>
  unauthenticatedHttpClient.get<T>(url, { params, ...config });

export const httpServicePostUnauthenticated = <T = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> =>
  unauthenticatedHttpClient.post<T>(url, data, config);
