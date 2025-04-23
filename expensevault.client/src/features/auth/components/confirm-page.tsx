import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmEmailPage: FC = () => {
  const { t } = useTranslation();

  const handleResendEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
          <div className="mt-4 flex w-full justify-center">
            <button
              className="btn btn-primary mt-4"
              type="button"
              onClick={handleResendEmail}
            >
              {t('email:resendEmailButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
