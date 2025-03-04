import { ApiResult } from '../../../model/common';
import {
  LoginCommand,
  LoginResponse,
} from '../../../model/common/backend-model';
import { httpServicePost } from '../axios/axios-http.service';

export const Login = async ({
  username,
  password,
}: LoginCommand): Promise<ApiResult<LoginResponse>> => {
  const response = await httpServicePost('/api/auth/login', {
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
