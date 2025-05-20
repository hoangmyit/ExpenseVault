import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';

import { TFunction } from 'i18next';

import { useAuth, useVerifyEmail } from '../hooks';

import { ROUTE_PATHS } from '@/routes/constants/route-paths';

const VerifyEmailPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmail, verifyData } = useVerifyEmail();
  const { signOut } = useAuth();
  const status = verifyData.status;

  const handleSignIn = () => {
    signOut();
    navigate(ROUTE_PATHS.SIGN_IN);
  };

  useEffect(() => {
    const userId = searchParams.get('userId');
    const token = decodeURIComponent(searchParams.get('token') ?? '');
    verifyEmail(token!, userId!);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-[20px] text-center">
      <div className="card bg-white shadow-xl">
        <div className="card-body">
          {status === 'succeeded' ? renderSuccessPage(t) : renderFailedPage(t)}
          <div className="mt-4 flex w-full justify-center">
            <button
              className="btn btn-primary mt-4"
              type="button"
              onClick={handleSignIn}
            >
              {t('signIn:signIn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderSuccessPage = (t: TFunction<'translation', undefined>) => {
  return (
    <>
      <div className="email">
        <img
          src="/assets/imgs/email-send.jpg"
          alt="email"
          className="mx-auto mb-4 h-64 w-64"
        />
      </div>
      <div className="text-2xl font-bold">
        {t('email:confirmEmailSuccessTitle')}
      </div>
      <div>{t('email:confirmEmailSuccessMessage1')}</div>
      <div>{t('email:confirmEmailSuccessMessage2')}</div>
      <div className="mt-4 text-sm text-gray-500">
        {t('email:confirmEmailSuccessNote')}
      </div>
    </>
  );
};

const renderFailedPage = (t: TFunction<'translation', undefined>) => {
  return (
    <>
      <div className="email">
        <img
          src="/assets/imgs/email-send.jpg"
          alt="email"
          className="mx-auto mb-4 h-64 w-64"
        />
      </div>
      <div className="text-2xl font-bold">
        {t('email:confirmEmailFailedTitle')}
      </div>
      <div>{t('email:confirmEmailFailedMessage1')}</div>
      <div>{t('email:confirmEmailFailedMessage2')}</div>
      <div className="mt-4 text-sm text-gray-500">
        {t('email:confirmEmailFailedNote')}
      </div>
    </>
  );
};

export default VerifyEmailPage;
