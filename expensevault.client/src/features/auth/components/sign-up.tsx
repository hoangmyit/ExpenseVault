import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { useAuth, useVerifyEmail } from '../hooks';
import { SignUpFormData, signUpSchema } from '../schemas/auth-schemas';

import { AvatarIcon, EmailIcon, LockIcon, LogoIcon } from '@/icons';
import { FacebookIcon, LinkedinIcon, TwitterXIcon } from '@/icons/brand';
import FormInput from '@/shared/components/form/form-input/form-input';
import Button from '@/shared/components/ui/button';
import { useZodForm } from '@/shared/hooks/use-zod-form';

const SignUpPage: FC = () => {
  const { registerUser, registerData } = useAuth();
  const { updateConfirmEmail } = useVerifyEmail();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useZodForm(signUpSchema);

  useEffect(() => {
    setIsSubmitting(registerData.status === 'loading');
  }, [registerData.status]);

  useEffect(() => {
    if (registerData.status === 'failed' && registerData.errors) {
      Object.entries(registerData.errors).forEach(([key, value]) => {
        setError(key as keyof SignUpFormData, {
          type: 'server',
          message: value[0],
        });
      });
    }
  }, [registerData.errors, setError, registerData.status]);

  useEffect(() => {
    if (registerData.status === 'succeeded') {
      updateConfirmEmail(email);
      navigate('/confirm-email');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData.status]);

  const onSubmit = async (data: SignUpFormData) => {
    setEmail(data.email);
    registerUser(data);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="mb-6 flex">
            <LogoIcon width="w-10" height="h-10" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-primary mb-2 text-2xl font-semibold">
              {t('signUp:title')}
            </h2>
            <p className="mb-6 font-semibold">{t('signUp:subtitle')}</p>
          </div>
          <div className="my-4">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormInput
                label={t('signUp:username')}
                placeholder={t('signUp:usernamePlaceholder')}
                type="text"
                error={errors.username}
                startDecorator={
                  <AvatarIcon
                    className="opacity-50"
                    width={undefined}
                    height="h-[1em]"
                  />
                }
                {...register('username')}
              />
              <FormInput
                label={t('signUp:email')}
                placeholder={t('signUp:emailPlaceholder')}
                type="email"
                error={errors.email}
                startDecorator={
                  <EmailIcon
                    className="opacity-50"
                    width={undefined}
                    height="h-[1em]"
                  />
                }
                {...register('email')}
              />
              <FormInput
                label={t('signUp:password')}
                placeholder={t('signUp:passwordPlaceholder')}
                type="password"
                error={errors.password}
                startDecorator={
                  <LockIcon
                    className="opacity-50"
                    width={undefined}
                    height="h-[1em]"
                  />
                }
                {...register('password')}
              />
              <FormInput
                label={t('signUp:confirmPassword')}
                placeholder={t('signUp:confirmPasswordPlaceholder')}
                type="password"
                error={errors.confirmPassword}
                startDecorator={
                  <LockIcon
                    className="opacity-50"
                    width={undefined}
                    height="h-[1em]"
                  />
                }
                {...register('confirmPassword')}
              />
              <div className="form-control mt-6 w-full">
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  className="btn btn-primary btn-wide max-w-full"
                >
                  {t('signUp:submitButton')}
                </Button>
              </div>
              <div className="mt-6 mb-2 flex flex-row justify-around">
                <Link to="#" className="btn btn-circle border-1">
                  <FacebookIcon className="fill-primary stroke-none" />
                </Link>
                <Link to="#" className="btn btn-circle border-1">
                  <TwitterXIcon className="fill-primary stroke-none" />
                </Link>
                <Link to="#" className="btn btn-circle border-1">
                  <LinkedinIcon className="fill-primary stroke-none" />
                </Link>
              </div>
            </form>
          </div>
          <div className="mb-4 flex flex-col">
            <div className="flex flex-row items-center justify-center text-sm">
              <div>{t('signUp:alreadyHaveAccount')}</div>
              <Link to="/sign-in" className="text-primary ml-1 font-bold">
                {t('signUp:signInLink')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
