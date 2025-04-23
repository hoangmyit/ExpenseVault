import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ResendEmailCommand,
  VerifyEmailCommand,
  VerifyEmailState,
} from '../types/verify-email';

import { toastInfo } from '@/shared/components/feedback/toast/toast';
import { dateAdd, dateDiff, getDateTimeNow } from '@/shared/utils/date-utils';
import { getLangText } from '@/shared/utils/language-util';
import { isNullOrEmpty, isNullOrUndefined } from '@/shared/utils/type-utils';
import { RootState } from '@/stores/store';

const initialState: VerifyEmailState = {
  confirmEmail: {
    data: {
      sentTime: dateAdd(getDateTimeNow(), { minutes: -6 }),
      email: '',
      userId: '',
    },
    status: 'idle',
    error: null,
  },
  verifyEmail: {
    data: null,
    status: 'idle',
    error: null,
  },
};

const emailSlice = createSlice({
  initialState,
  name: 'Verify Email',
  reducers: {
    resendEmailRequest: (state) => {
      const confirmData = state.confirmEmail.data;
      const sentTime = confirmData!.sentTime;
      if (
        isNullOrUndefined(sentTime) ||
        (dateDiff(sentTime!, getDateTimeNow(), 'minutes')?.minutes ?? 0) > 5
      ) {
        state.confirmEmail.status = 'loading';
        state.confirmEmail.error = null;
      } else if (
        isNullOrEmpty(confirmData!.email) ||
        isNullOrEmpty(confirmData!.userId)
      ) {
        state.confirmEmail.status = 'failed';
        state.confirmEmail.error = getLangText('email.toast.resendEmail.error');
      } else {
        toastInfo(getLangText('email.resendEmailTooSoon'));
      }
    },
    resendEmailSuccess: (state) => {
      state.confirmEmail.status = 'succeeded';
      state.confirmEmail.data!.sentTime = getDateTimeNow();
    },
    resendEmailFailed: (state, action) => {
      state.confirmEmail.status = 'failed';
      state.confirmEmail.error = action.payload;
    },
    verifyEmailRequest: (state, _action: PayloadAction<VerifyEmailCommand>) => {
      state.verifyEmail.status = 'loading';
      state.verifyEmail.error = null;
    },
    verifyEmailSuccess: (state) => {
      state.verifyEmail.status = 'succeeded';
      state.verifyEmail.data = null;
    },
    verifyEmailFailed: (state, action) => {
      state.verifyEmail.status = 'failed';
      state.verifyEmail.error = action.payload;
    },
    setConfirmEmail: (state, action: PayloadAction<ResendEmailCommand>) => {
      state.confirmEmail.data!.email = action.payload.email;
      state.confirmEmail.data!.userId = action.payload.userId;
    },
  },
});

export const {
  resendEmailRequest,
  resendEmailSuccess,
  resendEmailFailed,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailed,
} = emailSlice.actions;

export const verifyEmailReducer = emailSlice.reducer;
export const verifyEmailState = (state: RootState) => state.verifyEmail;
