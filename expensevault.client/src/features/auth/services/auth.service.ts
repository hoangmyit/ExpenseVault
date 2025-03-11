import { httpServicePost } from '../../../core/api/client';
import { ApiResult } from '../../../shared/types/common';
import {
  LoginCommand,
  LoginResponse,
  RegisterUserCommand,
} from '../../../shared/types/common/backend-model';

export const signIn = async ({
  username,
  password,
  rememberMe,
}: LoginCommand): Promise<ApiResult<LoginResponse>> => {
  const response = await httpServicePost<LoginResponse>('/api/auth/login', {
    username,
    password,
    rememberMe,
  });
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserCommand): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>('/api/auth/register', {
    name,
    email,
    password,
  });
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};
