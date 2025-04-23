import { DateTime } from 'luxon';

import { CommonState } from '@/shared/types/common';

export type VerifyEmailState = {
  confirmEmail: CommonState<{ sentTime: DateTime }>;
  verifyEmail: CommonState<null>;
};
