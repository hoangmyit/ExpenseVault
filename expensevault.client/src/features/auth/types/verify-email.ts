import { DateTime } from 'luxon';

import { CommonState } from '@/shared/types/common';

export type VerifyEmailState = {
  confirmEmail: CommonState<ResendEmailCommand & { sentTime: DateTime }>;
  verifyEmail: CommonState<null>;
};

export type VerifyEmailCommand = {
  token: string;
  userId: string;
};

export type ResendEmailCommand = {
  email: string;
};
