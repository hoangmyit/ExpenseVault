import { FC } from 'react';
import { Link } from 'react-router';

import AvatarIcon from '../../../icons/avatar-icon';
import FacebookIcon from '../../../icons/brand/facebook-icon';
import LinkedinIcon from '../../../icons/brand/linkedin-icon';
import TwitterXIcon from '../../../icons/brand/twitter-x-icon';
import FormInput from '../../../shared/components/form-input/form-input';

const SignUpPage: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="mb-6 flex">
            <AvatarIcon fill="black" width="w-10" height="h-10" />
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
            <form>
              <div className="grid md:grid-cols-2 md:gap-4">
                <FormInput
                  label="First name"
                  placeholder="Enter your first name"
                  type="text"
                />
                <FormInput
                  label="Last name"
                  placeholder="Enter your last name"
                  type="text"
                />
              </div>
              <FormInput
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <FormInput
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <FormInput
                label="Confirm password"
                placeholder="Enter your password"
                type="password"
              />
              <div className="form-control mt-6 w-full">
                <button className="btn btn-primary btn-wide max-w-full">
                  Sign Up
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
