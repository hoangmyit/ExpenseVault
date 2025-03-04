import { AuthUser, CommonState } from '../../model/common';

export type IAuthState = {
  isAuthenticated: boolean;
} & CommonState<AuthUser>;
