import { useCallback } from 'react';

import {
  resendEmailRequest,
  verifyEmailRequest,
  verifyEmailState,
} from '../store/verify-email-slice';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';

const useVerifyEmail = () => {
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

  return {
    verifyData: verifyEmailData.verifyEmail,
    confirmEmailData: verifyEmailData.confirmEmail,
    verifyEmail,
    resendEmail,
  };
};

export default useVerifyEmail;
