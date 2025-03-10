import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { LoginResponse } from '../../../shared/types/common/backend-model';
import {
  getAuthUser,
  removeAuthUser,
  removeRefreshToken,
  setAuthUser,
  setRefreshToken,
} from '../../../shared/utils/auth-util';
import { ConsoleLog } from '../../../shared/utils/common-util';

// Create an instance of axios with timeout
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 10000,
});

// Unauthenticated client with timeout
export const unauthenticatedHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 10000,
});

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
    ConsoleLog(error);
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
            ConsoleLog(err);
            return Promise.reject(err);
          });
      } else {
        // Start token refresh process
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) {
            removeAuthUser();
            removeRefreshToken();
            processQueue(new Error('No refresh token'));
            ConsoleLog(error);
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
          if (typeof window !== 'undefined') {
            const navigationEvent = new CustomEvent('auth:unauthorized', {
              detail: { redirectTo: '/sign-in' },
            });
            window.dispatchEvent(navigationEvent);
          }

          ConsoleLog(err);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    // For all other errors, just reject with the original error
    ConsoleLog(error);
    return Promise.reject(error);
  },
);

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
