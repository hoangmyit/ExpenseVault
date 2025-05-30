import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../stores/store';
import { LoginFormData, SignUpFormData } from '../schemas/auth-schemas';
import { IAuthState } from '../types/sign-in.const';
import {
  getAuthInfo,
  removeAuthToken,
  removeRefreshToken,
  setAuthToken,
  setRefreshToken,
} from '../utils/auth-util';

import { toastSuccess } from '@/shared/components/feedback/toast/toast';
import { ValidationErrors } from '@/shared/types/common';
import {
  LoginCommand,
  LoginResponse,
} from '@/shared/types/common/backend-model';

const initialState = (): IAuthState => {
  const info = getAuthInfo();
  return {
    authInfo: {
      isAuthenticated: !!info,
      status: 'idle',
      error: null,
      data: info,
      errors: {},
    },
    registerInfo: {
      status: 'idle',
      error: null,
      data: null,
      errors: {},
    },
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginCommand>) => {
      state.authInfo.status = 'loading';
      state.authInfo.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.authInfo.status = 'succeeded';
      setAuthToken(action.payload.token);
      setRefreshToken(action.payload.refreshToken);
      state.authInfo.data = getAuthInfo();
      state.authInfo.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.authInfo.status = 'failed';
      state.authInfo.error = action.payload;
    },
    loginServerValidation: (
      state,
      action: PayloadAction<ValidationErrors<LoginFormData>>,
    ) => {
      state.authInfo.errors = action.payload;
    },
    logout: (state) => {
      removeAuthToken();
      removeRefreshToken();
      state.authInfo.isAuthenticated = false;
      state.authInfo.data = null;
    },
    clearError: (state) => {
      state.authInfo.status = 'idle';
      state.authInfo.error = null;
    },
    registerUserRequest: (state, _action: PayloadAction<SignUpFormData>) => {
      state.registerInfo.status = 'loading';
      state.registerInfo.error = null;
    },
    registerUserSuccess: (state, action: PayloadAction<string>) => {
      state.registerInfo.status = 'succeeded';
      toastSuccess(action.payload);
    },
    registerUserFailure: (state, action: PayloadAction<string>) => {
      state.registerInfo.status = 'failed';
      state.registerInfo.error = action.payload;
    },
    registerUserServerValidation: (
      state,
      action: PayloadAction<ValidationErrors<SignUpFormData>>,
    ) => {
      state.registerInfo.errors = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginServerValidation,
  logout,
  clearError,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  registerUserServerValidation,
} = authSlice.actions;
export const AuthState = (state: RootState) => state.auth;
