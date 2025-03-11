import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { useAuth } from '../hooks/use-auth';
import { SignUpFormData, signUpSchema } from '../schemas/auth-schemas';

import { AvatarIcon, EmailIcon, LockIcon, LogoIcon } from '@/icons';
import { FacebookIcon, LinkedinIcon, TwitterXIcon } from '@/icons/brand';
import FormInput from '@/shared/components/form/form-input/form-input';
import Button from '@/shared/components/ui/button';
import { useZodForm } from '@/shared/hooks/use-zod-form';

const SignUpPage: FC = () => {
  const { registerUser, registerData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (data: SignUpFormData) => {
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
              Get Started
            </h2>
            <p className="mb-6 font-semibold">
              It's free to signup and only takes a minute.
            </p>
          </div>
          <div className="my-4">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormInput
                label="Username"
                placeholder="Enter your user name"
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
                label="Email"
                placeholder="Enter your email"
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
                label="Password"
                placeholder="Enter your password"
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
                label="Confirm password"
                placeholder="Enter your password"
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
                  Sign Up
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
              <div>Already have an account?</div>
              <Link to="/sign-in" className="text-primary ml-1 font-bold">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
