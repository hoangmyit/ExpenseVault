import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Last_Resend_Email_Time_Interval } from '../constants/token.const';
import { useAuth, useVerifyEmail } from '../hooks';
import { getAuthInfo, getAuthToken } from '../utils/auth-util';

import { ROUTE_PATHS } from '@/routes/constants/route-paths';
import { consoleLog } from '@/shared/utils/common-util';
import { dateDiff, getDateTimeNow } from '@/shared/utils/date-utils';
import { isNullOrEmpty } from '@/shared/utils/type-utils';

const ConfirmEmailPage: FC = () => {
  const { t } = useTranslation();
  const { resendEmail, confirmEmailData, updateConfirmEmail } =
    useVerifyEmail();
  const { authnData, signOut } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const lastSentTime = confirmEmailData?.sentTime;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer as NodeJS.Timeout);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    if (isNullOrEmpty(confirmEmailData?.email)) {
      if (authnData.isAuthenticated) {
        updateConfirmEmail(authnData.data?.email ?? '');
      } else if (getAuthToken()) {
        const user = getAuthInfo();
        if (user) {
          updateConfirmEmail(user.email);
        }
      }
    }
  });
  const handleResendEmail = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const now = getDateTimeNow();
    const timeDiffResult = dateDiff(lastSentTime!, now, 'second').seconds ?? 0;
    const canSendEmail =
      !lastSentTime || timeDiffResult >= Last_Resend_Email_Time_Interval;

    if (!canSendEmail) {
      const remainingTime = Last_Resend_Email_Time_Interval - timeDiffResult;
      setCountdown(remainingTime > 0 ? remainingTime : 0);
      return;
    }

    try {
      setIsLoading(true);

      resendEmail();

      setCountdown(Last_Resend_Email_Time_Interval);
    } catch (error) {
      consoleLog('Failed to resend email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut();
    navigate(ROUTE_PATHS.SIGN_IN);
  };

  // Format countdown to MM:SS
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = Math.floor(countdown % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-[20px] text-center">
      <div className="card bg-white shadow-xl">
        <div className="card-body">
          <div className="email">
            <img
              src="/assets/imgs/email-send.jpg"
              alt="email"
              className="mx-auto mb-4 h-64 w-64"
            />
          </div>
          <div className="text-2xl font-bold">
            {t('email:verifyEmailTitle')}
          </div>
          <div>{t('email:verifyEmailMessage')}</div>
          <div className="mt-4 text-sm text-gray-500">
            {t('email:verifyEmailResendNote')}
          </div>
          {authnData.isAuthenticated && (
            <div className="text-sm text-gray-500">
              {t('email:verifyEmailResendLogOutNote')}
            </div>
          )}
          <div className="mt-4 flex w-full justify-center">
            <button
              className="btn btn-primary mt-4"
              type="button"
              onClick={handleResendEmail}
              disabled={countdown > 0 || isLoading}
            >
              {isLoading
                ? t('common:loading')
                : countdown > 0
                  ? `${t('email:resendEmailButton')} (${formatCountdown()})`
                  : t('email:resendEmailButton')}
            </button>
          </div>
        </div>
        {authnData.isAuthenticated && (
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary m-4"
              onClick={(event) => handleSignOut(event)}
            >
              {t('profile:signOut')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
