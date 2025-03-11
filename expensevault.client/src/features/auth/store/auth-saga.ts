import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import { SignUpFormData } from '../schemas/auth-schemas';
import { registerUser, signIn } from '../services/auth.service';

import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerUserFailure,
  registerUserRequest,
  registerUserServerValidation,
  registerUserSuccess,
} from './auth-slice';

import {
  LoginCommand,
  LoginResponse,
} from '@/shared/types/common/backend-model';
import { handleApiCall } from '@/shared/utils/saga-util';

function* signInSaga(action: PayloadAction<LoginCommand>) {
  yield* handleApiCall(
    signIn,
    action.payload,
    (data: LoginResponse) => loginSuccess(data),
    (error) => loginFailure(error),
  );
}

function* registerUserSaga(action: PayloadAction<SignUpFormData>) {
  yield* handleApiCall(
    registerUser,
    action.payload,
    (data: string) => registerUserSuccess(data),
    (error) => registerUserFailure(error),
    registerUserServerValidation,
  );
}

function* authSaga() {
  yield takeLatest(loginRequest.type, signInSaga);
  yield takeLatest(registerUserRequest.type, registerUserSaga);
}

export default authSaga;
