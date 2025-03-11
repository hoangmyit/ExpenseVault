import {
  AuthState,
  loginRequest,
  registerUserRequest,
} from '../store/auth-slice';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(AuthState);

  const login = (username: string, password: string, rememberMe: boolean) => {
    return dispatch(loginRequest({ username, password, rememberMe }));
  };
  const registerUser = (email: string, password: string, name: string) => {
    return dispatch(registerUserRequest({ email, password, name }));
  };

  return {
    login,
    registerUser,
    authnData: authData.authInfo,
    registerData: authData.registerInfo,
  };
};
