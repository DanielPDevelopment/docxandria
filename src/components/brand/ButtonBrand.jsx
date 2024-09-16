import PropTypes from 'prop-types';

const ButtonBrand = ({
    extra = '',
    onClickHandler,
    type = '',
    buttonText,
    disabled = false,
    buttonIsCancel = false,
  }) => {
    // Determine the button class based on whether it is a cancel button or not
    const buttonClass = buttonIsCancel
      ? `linear w-[150px] rounded-xl bg-primaryRed py-[12px] text-black transition duration-200 hover:bg-secondaryRed hover:text-white font-poppins ${extra}`
      : `linear w-[150px] rounded-xl bg-primaryRed py-[12px] text-black transition duration-200 hover:bg-red-700 hover:text-white font-poppins ${extra}`;
  
    return (
      <button
        className={buttonClass}
        onClick={onClickHandler}
        type={type}
        disabled={disabled}
      >
        {buttonText}
      </button>
    );
  };
  
  // Define prop types for the ButtonBrand component
  ButtonBrand.propTypes = {
    extra: PropTypes.string,
    onClickHandler: PropTypes.func,
    type: PropTypes.string,
    buttonText: PropTypes.string,
    disabled: PropTypes.bool,
    buttonIsCancel: PropTypes.bool,
  };
  
  export default ButtonBrand;