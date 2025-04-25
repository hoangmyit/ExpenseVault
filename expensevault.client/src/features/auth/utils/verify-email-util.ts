import { DateTime } from 'luxon';

import {
  Last_Resend_Email_Time,
  Last_Resend_Email_Time_Interval,
} from '../constants/token.const';

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/shared/utils/common-util';
import { dateAdd, getDateTimeNow } from '@/shared/utils/date-utils';

export const getLastResendEmailTime = (): DateTime => {
  const lastResendEmailTime = getLocalStorageItem(Last_Resend_Email_Time);
  return lastResendEmailTime
    ? DateTime.fromISO(lastResendEmailTime)
    : dateAdd(getDateTimeNow(), {
        seconds: -Last_Resend_Email_Time_Interval - 60,
      });
};

export const setLastResendEmailTime = (time: DateTime): void =>
  setLocalStorageItem(Last_Resend_Email_Time, time.toISO()!);
