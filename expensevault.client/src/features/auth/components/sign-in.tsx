import { useState } from 'react';
import { Link } from 'react-router';

import { LoginFormData, loginSchema } from '../schemas/auth-schemas';
import { loginRequest } from '../store/auth-slice';

import './index.css';

import FacebookIcon from '@/icons/brand/facebook-icon';
import LinkedinIcon from '@/icons/brand/linkedin-icon';
import TwitterXIcon from '@/icons/brand/twitter-x-icon';
import LogoIcon from '@/icons/logon-icon';
import FormInput from '@/shared/components/form/form-input/form-input';
import { useZodForm } from '@/shared/hooks/use-zod-form';
import { useAppDispatch } from '@/stores/hooks';

// Using a function declaration rather than FC type (React 19 approach)
export default function SignInPage() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the Zod form hook
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
  } = useZodForm(loginSchema);

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      await dispatch(
        loginRequest({
          username: data.username,
          password: data.password,
          rememberMe: data.rememberMe,
        }),
      );
      // You could add navigation here when login succeeds
    } catch (error) {
      // Handle error if needed
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              Please sign in to continue React.
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
                <button
                  type="submit"
                  className="btn btn-primary btn-wide max-w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    'Sign In'
                  )}
                </button>
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
}
