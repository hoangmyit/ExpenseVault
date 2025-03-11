import { RegisterRequest } from './sign-up.const';

import { AuthUser, CommonState, ValidationState } from '@/shared/types/common';

export type IAuthState = {
  authInfo: CommonState<AuthUser> & { isAuthenticated: boolean };
  registerInfo: ValidationState<RegisterRequest>;
};
