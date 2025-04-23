import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import {
  resendEmailService,
  verifyEmailService,
} from '../services/auth.service';
import { VerifyEmailCommand } from '../types/verify-email';

import {
  resendEmail,
  resendEmailFailed,
  resendEmailSuccess,
  verifyEmail,
} from './verify-email-slice';

import { getLangText } from '@/shared/utils/language-util';
import { handleApiCall } from '@/shared/utils/saga-util';

function* resendVerificationEmail(action: PayloadAction<string>) {
  yield* handleApiCall(
    resendEmailService,
    action.payload,
    () => resendEmailSuccess(),
    (error) => resendEmailFailed(error),
    {
      useToastPromise: true,
      error: getLangText('email:toast.resendEmail.error'),
      pending: getLangText('email:toast.resendEmail.pending'),
      success: getLangText('email:toast.resendEmail.success'),
    },
  );
}

function* verifyUserEmail(action: PayloadAction<VerifyEmailCommand>) {
  yield* handleApiCall(
    verifyEmailService,
    action.payload,
    () => resendEmailSuccess(),
    (error) => resendEmailFailed(error),
    {
      useToastPromise: true,
      error: getLangText('email:toast.verifyEmail.error'),
      pending: getLangText('email:toast.verifyEmail.pending'),
      success: getLangText('email:toast.verifyEmail.success'),
    },
  );
}

function* verifyEmailSaga() {
  yield takeLatest(resendEmail.type, resendVerificationEmail);
  yield takeLatest(verifyEmail.type, verifyUserEmail);
}

export default verifyEmailSaga;
