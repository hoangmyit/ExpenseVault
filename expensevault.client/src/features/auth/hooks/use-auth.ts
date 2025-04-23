import { useCallback } from 'react';

import { SignUpFormData } from '../schemas/auth-schemas';
import {
  AuthState,
  loginRequest,
  registerUserRequest,
} from '../store/auth-slice';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(AuthState);

  const login = useCallback(
    (username: string, password: string, rememberMe: boolean) => {
      return dispatch(loginRequest({ username, password, rememberMe }));
    },
    [dispatch],
  );
  const registerUser = useCallback(
    (user: SignUpFormData) => {
      return dispatch(registerUserRequest(user));
    },
    [dispatch],
  );

  return {
    login,
    registerUser,
    authnData: authData.authInfo,
    registerData: authData.registerInfo,
  };
};
