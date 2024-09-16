import React, { useState } from 'react';
import InputField from 'components/fields/InputField';
import Checkbox from 'components/checkbox';
import { useAuth } from '../../contexts/user/AuthContext';
import Logo from 'components/brand/Logo';
import ButtonBrand from 'components/brand/ButtonBrand';

// Determine the base name for routing based on the environment
const currentBaseName = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? process.env.REACT_APP_BASENAME_DEV
  : process.env.REACT_APP_BASENAME;

// Sign-up component
export default function SignUp() {
  const { signUp, isLoading } = useAuth(); // Extract signUp function and loading state from context
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: '',
    companyName: '',
  });
  const [errors, setErrors] = useState('');

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    const results = await signUp(formData);
    if (results?.errors?.length) {
      setErrors(results.errors[0].msg); // Set the first error message
    }
  };

  return (
    <div className="flex flex-wrap content-center items-center sm:h-screen lg:h-full">
      {/* Sign-up section */}
      <div className="mt-[5vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[520px]">
        <div
          className="flex items-end cursor-pointer"
          onClick={() => { window.location.href = currentBaseName || '/'; }}
        >
          <Logo
            textExtra="md:text-4xl text-2xl"
            imageExtra="md:h-14 h-12"
          />
          <h4 className="ml-2 leading-[40px] mt-2 text-xl font-bold font-architects uppercase text-bold text-creamyWhite">
            Register
          </h4>
        </div>
        <p className="text-creamyWhite text-sm mb-4">
          Create your free account to get started!
        </p>

        {/* Form for user registration */}
        <form onSubmit={handleSignUp}>
          {/* Email Input Field */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="addy@email.com"
            id="email"
            type="email"
            autocomplete="username"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {/* First Name Input Field */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="First Name*"
            placeholder="First Name"
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />

          {/* Last Name Input Field */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Last Name*"
            placeholder="Last Name"
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />

          {/* Company Name Input Field */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Company Name*"
            placeholder="Company Name"
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />

          {/* Password Input Field */}
          <InputField
            autocomplete="new-password"
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {/* Repeat Password Input Field */}
          <InputField
            autocomplete="new-password"
            variant="auth"
            extra="mb-3"
            label="Repeat Password*"
            placeholder="Min. 8 characters"
            id="password2"
            type="password"
            value={formData.password2}
            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
          />

          {/* Terms of Service Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-gray-400 dark:text-white">
                I agree to the terms of service.
              </p>
            </div>
          </div>

          {/* Register Button */}
          <ButtonBrand
            disabled={isLoading}
            extra="!w-full"
            buttonText="Register"
          />
        </form>

        {/* Sign In Link and Error Message */}
        <div className="mt-4">
          <span className="text-sm font-medium text-gray-400 dark:text-gray-400">
            Already have an account?
          </span>
          <a
            href={`${currentBaseName}/#/auth/sign-in`}
            className="ml-1 text-sm font-medium text-primaryBlue hover:text-secondaryBlue dark:text-white"
          >
            Sign In
          </a>
        </div>
        <p className="mt-1 text-base text-primaryRed">
          {errors ? `${errors} ☝` : ''}
        </p>
      </div>
    </div>
  );
}
