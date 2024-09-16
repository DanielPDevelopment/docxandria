import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'components/brand/Logo';

const LoadingDialog = ({ message, img }) => (
  <>
    <div>
      <div className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70" />
    </div>
    <div className="absolute 
      top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border-primaryBlue w-[90%] sm:w-[500px]
      border-[0.05px] bg-gray-light py-5 rounded-lg px-2 xl:px-20 shadow-lg text-white z-50 flex flex-wrap justify-center">
      <div className="flex items-end pb-2">
        <Logo
          textExtra="md:text-4xl text-2xl"
          imageExtra="md:h-14 h-12 drop-shadow-xl"
        />
      </div>
      <span className="text-center w-full pb-2">{message}</span>
      {img}
    </div>
  </>
);

// PropTypes for LoadingDialog component
LoadingDialog.propTypes = {
  /** The message to display in the loading dialog */
  message: PropTypes.string.isRequired,
  /** An optional image or element to display below the message */
  img: PropTypes.node,
};

export default LoadingDialog;
