import { useCallback } from 'react';

import {
  resendEmailRequest,
  setConfirmEmail,
  verifyEmailRequest,
  verifyEmailState,
} from '../store/verify-email-slice';

import { toastError } from '@/shared/components/feedback/toast/toast';
import { getLangText } from '@/shared/utils/language-util';
import { isGuid, isNullOrEmpty } from '@/shared/utils/type-utils';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

export const useVerifyEmail = () => {
  const dispatch = useAppDispatch();
  const verifyEmailData = useAppSelector(verifyEmailState);

  const verifyEmail = useCallback(
    (token: string, userId: string) => {
      if (isNullOrEmpty(token) || isNullOrEmpty(userId) || !isGuid(userId)) {
        toastError(getLangText('email:verifyEmail.error'));
        return;
      }
      return dispatch(verifyEmailRequest({ token, userId }));
    },
    [dispatch],
  );

  const resendEmail = useCallback(() => {
    const email = verifyEmailData.confirmEmail.data!.email;
    if (!isNullOrEmpty(email)) {
      return dispatch(resendEmailRequest({ email }));
    } else {
      toastError(getLangText('email:signInToResend'));
    }
  }, [dispatch, verifyEmailData.confirmEmail.data]);

  const updateConfirmEmail = useCallback(
    (email: string) => {
      return dispatch(setConfirmEmail({ email }));
    },
    [dispatch],
  );

  return {
    verifyData: verifyEmailData.verifyEmail,
    confirmEmailData: verifyEmailData.confirmEmail.data,
    verifyEmail,
    resendEmail,
    updateConfirmEmail,
  };
};
