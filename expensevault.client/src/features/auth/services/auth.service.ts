import { httpServicePost } from '../../../core/api/client';
import { ApiResult } from '../../../shared/types/common';
import {
  LoginCommand,
  LoginResponse,
  RegisterUserCommand,
} from '../../../shared/types/common/backend-model';

export const signIn = async (
  params: LoginCommand,
): Promise<ApiResult<LoginResponse>> => {
  const response = await httpServicePost<LoginResponse>(
    '/api/auth/login',
    params,
  );
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const registerUser = async (
  user: RegisterUserCommand,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>('/api/auth/register', user);
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};
