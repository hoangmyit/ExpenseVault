import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  LoginCommand,
  LoginResponse,
} from '../../../model/common/backend-model';
import { RootState } from '../../../stores/store';
import {
  getAuthInfo,
  removeAuthUser,
  setAuthUser,
} from '../../../utils/auth-util';
import { IAuthState } from '../sign-in.const';

const initialState = (): IAuthState => {
  const info = getAuthInfo();
  return {
    isAuthenticated: !!info,
    status: 'idle',
    error: null,
    data: info,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginCommand>) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.status = 'succeeded';
      const token = action.payload.token;
      setAuthUser(token);
      localStorage.setItem('refresh_token', action.payload.refreshToken);
      state.data = getAuthInfo();
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      removeAuthUser();
      state.isAuthenticated = false;
      state.data = null;
    },
    clearError: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { loginRequest, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;
export const AuthState = (state: RootState) => state.auth;
