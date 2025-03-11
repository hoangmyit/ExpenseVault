import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../stores/store';
import { IAuthState } from '../types/sign-in.const';
import {
  getAuthInfo,
  removeAuthUser,
  setAuthUser,
  setRefreshToken,
} from '../utils/auth-util';

import {
  LoginCommand,
  LoginResponse,
  RegisterUserCommand,
} from '@/shared/types/common/backend-model';

const initialState = (): IAuthState => {
  const info = getAuthInfo();
  return {
    authInfo: {
      isAuthenticated: !!info,
      status: 'idle',
      error: null,
      data: info,
    },
    registerInfo: {
      status: 'idle',
      error: null,
      data: null,
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
      setAuthUser(action.payload.token);
      setRefreshToken(action.payload.refreshToken);
      state.authInfo.data = getAuthInfo();
      state.authInfo.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.authInfo.status = 'failed';
      state.authInfo.error = action.payload;
    },
    logout: (state) => {
      removeAuthUser();
      state.authInfo.isAuthenticated = false;
      state.authInfo.data = null;
    },
    clearError: (state) => {
      state.authInfo.status = 'idle';
      state.authInfo.error = null;
    },
    registerUserRequest: (
      state,
      _action: PayloadAction<RegisterUserCommand>,
    ) => {
      state.registerInfo.status = 'loading';
      state.registerInfo.error = null;
    },
    registerUserSuccess: (state, action: PayloadAction<string>) => {
      state.registerInfo.status = 'succeeded';
      state.registerInfo.data = action.payload;
    },
    registerUserFailure: (state, action: PayloadAction<string>) => {
      state.registerInfo.status = 'failed';
      state.registerInfo.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
} = authSlice.actions;
export const AuthState = (state: RootState) => state.auth;
