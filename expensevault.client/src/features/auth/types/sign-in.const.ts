import { LoginFormData } from '../schemas/auth-schemas';

import { RegisterRequest } from './sign-up.const';

import {
  AuthUser,
  CommonState,
  ValidationErrors,
  ValidationState,
} from '@/shared/types/common';

export type IAuthState = {
  authInfo: CommonState<AuthUser> & { isAuthenticated: boolean } & {
    errors: ValidationErrors<LoginFormData>;
  };
  registerInfo: ValidationState<RegisterRequest>;
};
