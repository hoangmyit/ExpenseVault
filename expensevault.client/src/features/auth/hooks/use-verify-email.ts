import { useCallback } from 'react';

import {
  resendEmailRequest,
  setConfirmEmail,
  verifyEmailRequest,
  verifyEmailState,
} from '../store/verify-email-slice';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';

export const useVerifyEmail = () => {
  const dispatch = useAppDispatch();
  const verifyEmailData = useAppSelector(verifyEmailState);

  const verifyEmail = useCallback(
    (token: string, userId: string) => {
      return dispatch(verifyEmailRequest({ token, userId }));
    },
    [dispatch],
  );

  const resendEmail = useCallback(() => {
    return dispatch(resendEmailRequest());
  }, [dispatch]);

  const updateConfirmEmail = useCallback(
    (email: string) => {
      return dispatch(setConfirmEmail({ email }));
    },
    [dispatch],
  );

  return {
    verifyData: verifyEmailData.verifyEmail.data,
    confirmEmailData: verifyEmailData.confirmEmail.data,
    verifyEmail,
    resendEmail,
    updateConfirmEmail,
  };
};
