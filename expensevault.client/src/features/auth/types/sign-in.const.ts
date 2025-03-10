import { AuthUser, CommonState } from '../../../shared/types/common';

export type IAuthState = {
  isAuthenticated: boolean;
} & CommonState<AuthUser>;
