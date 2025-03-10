import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';

import { ApiResult } from '../types/common';

import { getErrorMessage } from './common-util';

export function* handleApiCall<TResponse, TSuccessPayload, TErrorPayload>(
  apiCall: () => Promise<ApiResult<TResponse>>,
  successAction: (data: TResponse) => {
    type: string;
    payload: TSuccessPayload;
  },
  failureAction: (error: string) => { type: string; payload: TErrorPayload },
): Generator<
  | CallEffect<ApiResult<TResponse>>
  | PutEffect<{ type: string; payload: TSuccessPayload | TErrorPayload }>,
  void,
  ApiResult<TResponse>
> {
  try {
    const result = yield call(apiCall);
    yield put(successAction(result.data));
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Operation failed');
    yield put(failureAction(errorMessage));
  }
}
