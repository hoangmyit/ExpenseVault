import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { ApiResult, ValidationErrors } from '../types/common';

import { ConsoleLog, getErrorMessage } from './common-util';

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
    const result = yield call(apiCall, request);
    yield put(successAction(result.data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    ConsoleLog(error);
    const errorMessage = getErrorMessage(error, 'Operation failed');
    yield put(failureAction(errorMessage));
    if (error.response?.status === 400 && validationAction) {
      const errorData = error.response.data.errors;
      if (errorData) {
        yield put(validationAction(error.response.data.errors));
      }
    }
  }
}
