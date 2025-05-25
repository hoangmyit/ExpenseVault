import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import { SignUpFormData } from '../schemas/auth-schemas';
import { registerUserService, signInService } from '../services/auth.service';

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
import { getLangText } from '@/shared/utils/language-util';
import { handleApiCall } from '@/shared/utils/saga-util';

function* signInSaga(action: PayloadAction<LoginCommand>) {
  yield* handleApiCall(
    signInService,
    action.payload,
    (data: LoginResponse) => loginSuccess(data),
    (error) => loginFailure(error),
    {
      useToastPromise: true,
      error: getLangText('signIn:failedSignIn'),
      pending: getLangText('signIn:pendingSignIn'),
      success: getLangText('signIn:successSignIn'),
    },
    undefined,
    undefined,
    loginServerValidation,
  );
}

function* registerUserSaga(action: PayloadAction<SignUpFormData>) {
  yield* handleApiCall(
    registerUserService,
    action.payload,
    (data: string) => registerUserSuccess(data),
    (error) => registerUserFailure(error),
    {
      useToastPromise: true,
      error: getLangText('signUp:failedSignUp'),
      pending: getLangText('signUp:pendingSignUp'),
      success: getLangText('signUp:successSignUp'),
    },
    undefined,
    undefined,
    registerUserServerValidation,
  );
}

function* authSaga() {
  yield takeLatest(loginRequest.type, signInSaga);
  yield takeLatest(registerUserRequest.type, registerUserSaga);
}

export default authSaga;
