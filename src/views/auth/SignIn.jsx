import React, { useState } from 'react';
import InputField from 'components/fields/InputField';
import Checkbox from 'components/checkbox';
import { useAuth } from '../../contexts/user/AuthContext';
import ButtonBrand from 'components/brand/ButtonBrand';
import Logo from 'components/brand/Logo';

// Determine the base name for routing based on the environment
const currentBaseName = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? process.env.REACT_APP_BASENAME_DEV
  : process.env.REACT_APP_BASENAME;

// Sign-in component
export default function SignIn() {
  const { signIn, isLoading } = useAuth(); // Extract signIn function and loading state from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');

  // Handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    const results = await signIn(formData);
    if (results?.errors?.length) {
      setErrors(results.errors[0].msg); // Set the first error message
    }
  };

  return (
    <div className="flex flex-wrap content-center items-center h-full">
      {/* Sign-in section */}
      <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <div
          className="flex items-end cursor-pointer mb-4"
          onClick={() => { window.location.href = currentBaseName || '/'; }}
        >
          <Logo
            textExtra="md:text-4xl text-2xl"
            imageExtra="md:h-14 h-12"
          />
          <h4 className="ml-2 leading-[40px] mt-2 text-xl font-bold font-architects uppercase text-bold text-creamyWhite">
            Sign In
          </h4>
        </div>

        <form onSubmit={handleSignIn}>
          {/* Email Input Field */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="email@email.com"
            id="email"
            type="text"
            value={formData.email}
            autocomplete="username"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {/* Password Input Field */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            autocomplete="current-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {/* Checkbox and Forgot Password Link */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-gray-400 dark:text-white">
                Keep me logged in
              </p>
            </div>
            <a
              className="text-sm font-medium text-primaryBlue hover:text-secondaryBlue dark:text-white"
              href="#"
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <ButtonBrand
            disabled={isLoading}
            extra="!w-full"
            buttonText="Sign In"
          />

        </form>

        {/* Sign Up Link and Error Message */}
        <div className="mt-3">
          <span className="text-sm font-medium text-gray-400 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href={`${currentBaseName}/#/auth/sign-up`}
            className="ml-1 text-sm font-medium text-primaryBlue hover:text-secondaryBlue dark:text-white"
          >
            Create an account
          </a>
        </div>
        <p className="mt-1 text-base text-primaryRed">
          {errors ? `${errors} ☝` : ''}
        </p>
      </div>
    </div>
  );
}
