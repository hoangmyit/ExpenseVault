import { AuthUser, CommonState } from '../../../shared/types/common';

export type IAuthState = {
  authInfo: CommonState<AuthUser> & { isAuthenticated: boolean };
  registerInfo: CommonState<string>;
};
