import React from 'react';

// Custom Footer component
const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
      <h5 className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
        <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base text-poppins">
          ©{1900 + new Date().getFullYear()} All Rights Reserved.
        </p>
      </h5>
      
      {/* Removed until pages built out */}
      {/* <div>
        <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href=""
              className="text-base font-medium text-gray-600 hover:text-gray-800"
            >
              Support
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href=""
              className="text-base font-medium text-gray-600 hover:text-gray-800"
            >
              License
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href=""
              className="text-base font-medium text-gray-600 hover:text-gray-800"
            >
              Terms of Use
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Footer;
