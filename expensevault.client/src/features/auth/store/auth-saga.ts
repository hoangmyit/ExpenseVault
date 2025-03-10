import { PayloadAction } from '@reduxjs/toolkit';
import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';

import { ApiResult } from '@/shared/types/common';
import {
  LoginCommand,
  LoginResponse,
} from '@/shared/types/common/backend-model';
import { getErrorMessage } from '@/shared/utils/common-util';

import { Login } from '../services/auth.service';
import { loginFailure, loginRequest, loginSuccess } from './auth-slice';

function* signInSaga(
  action: PayloadAction<LoginCommand>,
): Generator<
  | CallEffect<ApiResult<LoginResponse>>
  | PutEffect<ReturnType<typeof loginSuccess | typeof loginFailure>>,
  void,
  ApiResult<LoginResponse>
> {
  try {
    const result = yield call(Login, {
      username: action.payload.username,
      password: action.payload.password,
    });
    if (result.success) {
      yield put(loginSuccess(result.data));
    } else {
      yield put(loginFailure(result.message ?? 'Failed to login'));
    }
  } catch (error) {
    yield put(loginFailure(getErrorMessage(error, 'Failed to login')));
  }
}

function* authSaga() {
  yield takeLatest(loginRequest.type, signInSaga);
}

export default authSaga;
