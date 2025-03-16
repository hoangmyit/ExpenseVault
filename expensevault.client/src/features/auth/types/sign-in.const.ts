import { RegisterRequest } from './sign-up.const';

import { AuthUser, ValidationState } from '@/shared/types/common';

export type IAuthState = {
  authInfo: ValidationState<AuthUser> & { isAuthenticated: boolean };
  registerInfo: ValidationState<RegisterRequest>;
};
