import './sign-in.css';

import { FC } from 'react';
import { Link } from 'react-router';

import FormInput from '../../components/form-input/form-input';
import AvatarIcon from '../../icons/avatar-icon';
import FacebookIcon from '../../icons/brand/facebook-icon';
import LinkedinIcon from '../../icons/brand/linkedin-icon';
import TwitterXIcon from '../../icons/brand/twitter-x-icon';

const SignInPage: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <div className="mb-6 flex">
            <AvatarIcon fill="black" width="w-10" height="h-10" />
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
            <form>
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
              <div className="form-control mt-6 w-full">
                <button className="btn btn-primary btn-wide max-w-full">
                  Sign In
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
};

export default SignInPage;
