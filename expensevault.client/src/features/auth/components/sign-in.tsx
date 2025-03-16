import { FC, use, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { useAuth } from '../hooks/use-auth';
import { LoginFormData, loginSchema } from '../schemas/auth-schemas';

import './index.css';

import { LogoIcon } from '@/icons';
import { FacebookIcon, LinkedinIcon, TwitterXIcon } from '@/icons/brand';
import FormInput from '@/shared/components/form/form-input/form-input';
import Button from '@/shared/components/ui/button';
import { useZodForm } from '@/shared/hooks/use-zod-form';

const SignInPage: FC = () => {
  const { login, authnData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the Zod form hook
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useZodForm(loginSchema);

  useEffect(() => {
    setIsSubmitting(authnData.status === 'loading');
  }, [authnData.status]);

  useEffect(() => {
    if (authnData.status === 'failed' && authnData.errors) {
      Object.entries(authnData.errors).forEach(([key, value]) => {
        setError(key as keyof LoginFormData, {
          type: 'server',
          message: value[0],
        });
      });
    }
  }, [authnData.errors, setError, authnData.status]);

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    login(data.username, data.password, data.rememberMe);
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
              Welcome back!
            </h2>
            <p className="mb-6 font-semibold">
              Please sign in to continue Expense Vault.
            </p>
          </div>
          <div className="tabs tabs-box bg-white shadow-none" id="sign-in-tabs">
            <input
              type="radio"
              name="sign-in-tabs"
              className="tab"
              aria-label="Email"
              defaultChecked
            />
            <input
              type="radio"
              name="sign-in-tabs"
              className="tab"
              aria-label="Google"
            />
          </div>
          <div className="m-4">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormInput
                label="Username"
                placeholder="Enter your username"
                type="text"
                error={errors.username}
                {...register('username')}
                autoComplete="username"
              />
              <FormInput
                label="Password"
                placeholder="Enter your password"
                type="password"
                error={errors.password}
                {...register('password')}
                autoComplete="current-password"
              />

              <div className="form-control mt-2">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    {...register('rememberMe')}
                  />
                  <span className="label-text">Remember me</span>
                </label>
              </div>

              <div className="form-control mt-6 w-full">
                <Button
                  type="submit"
                  className="btn btn-primary btn-wide max-w-full"
                  isLoading={isSubmitting}
                >
                  Sign In
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
          <div className="mt-2 flex flex-col">
            <Link
              to="/forgot-password"
              className="text-primary ml-1 text-center text-sm font-bold"
            >
              Forgot your password?
            </Link>
            <div className="flex flex-row items-center justify-center text-sm">
              <div>Don't have an account?</div>
              <Link to="/sign-up" className="text-primary ml-1 font-bold">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
