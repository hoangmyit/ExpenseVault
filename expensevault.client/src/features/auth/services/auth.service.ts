import { httpServicePost } from '../../../core/api/client';
import { ApiResult } from '../../../shared/types/common';
import {
  LoginCommand,
  LoginResponse,
} from '../../../shared/types/common/backend-model';

export const Login = async ({
  username,
  password,
}: LoginCommand): Promise<ApiResult<LoginResponse>> => {
  const response = await httpServicePost<LoginResponse>('/api/auth/login', {
    username,
    password,
  });
  return {
    success: true,
    data: {
      token: response.data.token,
      refreshToken: response.data.refreshToken,
    },
    status: response.status,
  };
};
