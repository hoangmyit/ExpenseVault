import { toast } from 'react-toastify';

import { Axios, AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { ToastPromiseOptions } from '../components/feedback/toast/toast.const';
import {
  TOAST_MESSAGES_ERROR,
  TOAST_MESSAGES_PENDING,
  TOAST_MESSAGES_SUCCESS,
} from '../constants';
import { ApiResult, ValidationErrors } from '../types/common';

import { consoleLog, getErrorMessage } from './common-util';
import { getLangText } from './language-util';

export function* handleApiCall<
  TRequest,
  TResponse,
  TSuccessPayload,
  TErrorPayload,
>(
  apiCall: (request: TRequest) => Promise<ApiResult<TResponse>>,
  request: TRequest,
  successAction: (data: TResponse) => {
    type: string;
    payload: TSuccessPayload;
  },
  failureAction: (error: string) => { type: string; payload: TErrorPayload },
  toastOptions: ToastPromiseOptions | null,
  validationAction?: (errors: ValidationErrors<TRequest>) => {
    type: string;
    payload: ValidationErrors<TRequest>;
  },
): Generator<
  | CallEffect<ApiResult<TResponse>>
  | PutEffect<{
      type: string;
      payload: TSuccessPayload | TErrorPayload | ValidationErrors<TRequest>;
    }>,
  void,
  ApiResult<TResponse>
> {
  try {
    const apiPromise = apiCall(request);

    if (toastOptions?.useToastPromise) {
      toast.promise(apiPromise, {
        pending: toastOptions.pending || TOAST_MESSAGES_PENDING,
        success: {
          render({ data }) {
            // Use API success message if available
            if (data?.message) {
              return data.message;
            }
            return toastOptions.success || TOAST_MESSAGES_SUCCESS;
          },
        },
        error: {
          render({ data }) {
            const axiosError = data as AxiosError<ApiResult<TResponse>>;
            if (axiosError?.isAxiosError) {
              const result = axiosError.response?.data;
              // Try to get message key from response data
              if (result?.messageKey) {
                return getLangText(result.messageKey);
              }
              // Try to get message from response data
              if (result?.message) {
                return result.message;
              }
            }
            // If it's a string, use it directly
            if (typeof data === 'string') {
              return data;
            }
            // Fallback to default or provided error message
            return toastOptions.error || TOAST_MESSAGES_ERROR;
          },
        },
      });
    }

    const result = yield call(() => apiPromise);
    yield put(successAction(result.data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    consoleLog(error);
    const errorMessage = getErrorMessage(error, TOAST_MESSAGES_ERROR);
    yield put(failureAction(errorMessage));
    if (error.response?.status === 400 && validationAction) {
      const errorData = error.response.data.errors;
      if (errorData) {
        yield put(validationAction(error.response.data.errors));
      }
    }
  }
}
