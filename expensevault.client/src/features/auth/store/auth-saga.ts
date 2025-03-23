import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import {
  REGISTER_USER_ERROR_MESSAGE,
  REGISTER_USER_PENDING_MESSAGE,
  REGISTER_USER_SUCCESS_MESSAGE,
  SIGN_IN_ERROR_MESSAGE,
  SIGN_IN_PENDING_MESSAGE,
  SIGN_IN_SUCCESS_MESSAGE,
} from '../constants/message.const';
import { SignUpFormData } from '../schemas/auth-schemas';
import { registerUser, signIn } from '../services/auth.service';

import {
  loginFailure,
  loginRequest,
  loginServerValidation,
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
    {
      useToastPromise: true,
      error: SIGN_IN_ERROR_MESSAGE,
      pending: SIGN_IN_PENDING_MESSAGE,
      success: SIGN_IN_SUCCESS_MESSAGE,
    },
    loginServerValidation,
  );
}

function* registerUserSaga(action: PayloadAction<SignUpFormData>) {
  yield* handleApiCall(
    registerUser,
    action.payload,
    (data: string) => registerUserSuccess(data),
    (error) => registerUserFailure(error),
    {
      useToastPromise: true,
      error: REGISTER_USER_ERROR_MESSAGE,
      pending: REGISTER_USER_PENDING_MESSAGE,
      success: REGISTER_USER_SUCCESS_MESSAGE,
    },
    registerUserServerValidation,
  );
}

function* authSaga() {
  yield takeLatest(loginRequest.type, signInSaga);
  yield takeLatest(registerUserRequest.type, registerUserSaga);
}

export default authSaga;
