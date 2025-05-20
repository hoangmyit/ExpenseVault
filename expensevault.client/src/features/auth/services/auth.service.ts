import { httpServicePost } from '../../../core/api/client';
import { ApiResult } from '../../../shared/types/common';
import {
  LoginCommand,
  LoginResponse,
} from '../../../shared/types/common/backend-model';
import { SignUpFormData } from '../schemas/auth-schemas';
import { ResendEmailCommand, VerifyEmailCommand } from '../types/verify-email';

export const signInService = async (
  params: LoginCommand,
): Promise<ApiResult<LoginResponse>> => {
  const response = await httpServicePost<LoginResponse>(
    '/api/auth/login',
    params,
  );
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};

export const registerUserService = async (
  user: SignUpFormData,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>('/api/auth/register', user);
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};

export const verifyEmailService = async (
  verifyEmailCommand: VerifyEmailCommand,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>(
    '/api/auth/verify-email',
    verifyEmailCommand,
  );
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};

export const resendEmailService = async (
  email: ResendEmailCommand,
): Promise<ApiResult<string>> => {
  const response = await httpServicePost<string>(
    '/api/auth/resend-email',
    email,
  );
  return {
    isSuccess: true,
    data: response.data,
    status: response.status,
  };
};
