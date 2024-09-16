import React from 'react';
import Footer from 'components/footer/FooterAuthDefault';
import { Logo } from '../components/brand/Logo';
import ButtonBrand from '../components/brand/ButtonBrand';
import documentSearch from 'assets/img/documentSearch.png';
import { useAuth } from 'contexts/user/AuthContext';

// Determine the base name for routing based on the environment
const currentBaseName = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? process.env.REACT_APP_BASENAME_DEV
  : process.env.REACT_APP_BASENAME;

// Main marketing page component
const MarketingHome = () => {
  const { signIn } = useAuth(); // Retrieve sign-in function from authentication context

  return (
    <div className="min-h-screen max-w-100% flex flex-wrap justify-center">
      <div className="bg-lightGray w-full flex flex-wrap justify-center">
        {/* Main content container */}
        <div className="w-[1300px] max-w-[1300px] py-3 px-3 2xl:px-0 px-4">
          <div className="h-90px pt-3 flex flex-wrap justify-between">
            {/* Header section with logo and navigation */}
            <div className="flex flex-wrap items-center justify-around font-poppins">
              {/* Left side - Logo */}
              <div>
                <Logo
                  textExtra="md:text-4xl text-2xl"
                  imageExtra="md:h-14 h-12 drop-shadow-xl"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-around font-poppins">
              {/* Right side - Navigation links */}
              {/* Demo available login */}
              <div
                className="md:px-6 px-3 text-gray-500 cursor-pointer hover:text-white transition duration-200 font-poppins xl:text-lg text-sm hover:underline hover:underline-offset-8"
                onClick={() => signIn({ email: 'demo@demo.com', password: 'Demo123' })}
              >
                Demo
              </div>
              <div
                className="md:px-6 px-3 text-gray-500 cursor-pointer hover:text-white transition duration-200 font-poppins xl:text-lg text-sm hover:underline hover:underline-offset-8"
                onClick={() => { window.location.href = `${currentBaseName}/#/auth/sign-in`; }}
              >
                Login
              </div>
              <div
                className="md:block hidden md:px-6 px-3 text-gray-500 cursor-pointer hover:text-white transition duration-200 font-poppins xl:text-lg text-sm hover:underline hover:underline-offset-8"
                onClick={() => { window.location.href = `${currentBaseName}/#/auth/sign-up`; }}
              >
                Get Started Free!
              </div>
            </div>
          </div>

          <div className="h-[calc(100vh-80px)] flex flex-wrap items-center content-center justify-start">
            {/* Main content section */}
            <div className="flex flex-wrap items-start content-center lg:w-1/2 pr-10 mb-0">
              <h1 className="w-full m-0 p-0 md:text-[50px] text-[40px] text-gray-500 font-poppins md:leading-[50px] leading-[40px]">
                <span className="text-white drop-shadow-xl">Powerful</span> Voice to Document Search
              </h1>
              <p className="font-architects text-white md:text-base text-md pt-2">
                Find what you need, as you need it.
              </p>
            </div>

            <div className="flex flex-wrap align-center items-center lg:w-1/2">
              <img
                src={documentSearch}
                alt="Document Search"
                className="md:px-1 px-1 md:h-[300px] h-[auto] hidden 2xl:block drop-shadow-xl"
                style={{ width: 'auto' }}
              />
            </div>

            {/* Button to sign up on Mobile devices */}
            <ButtonBrand
              extra="block 2xl:hidden max-w-[500px] md:w-[150px] w-[90vw] mt-4"
              onClickHandler={() => { window.location.href = `${currentBaseName}/#/auth/sign-up`; }}
              buttonText="Get Started!"
            />
          </div>
        </div>
      </div>

      {/* Footer section */}
      <div className="bg-lightGray w-full flex flex-wrap justify-center shadow-xl items-center content-center pt-8">
        <Footer />
      </div>
    </div>
  );
};

export default MarketingHome;
