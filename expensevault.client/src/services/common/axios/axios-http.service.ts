/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';

import { ConsoleLog } from '../../../utils/common-util';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    ConsoleLog(error);
    return Promise.reject(error);
  },
);

export const httpServiceGet = (
  url: string,
  params?: any,
  config?: AxiosRequestConfig,
) => axiosInstance.get(url, { params, ...config });

export const httpServicePost = (
  url: string,
  data: any,
  config?: AxiosRequestConfig,
) => axiosInstance.post(url, data, config);

export const httpServicePut = (
  url: string,
  data: any,
  config?: AxiosRequestConfig,
) => axiosInstance.put(url, data, config);

export const httpServiceDelete = (url: string, config?: AxiosRequestConfig) =>
  axiosInstance.delete(url, config);
