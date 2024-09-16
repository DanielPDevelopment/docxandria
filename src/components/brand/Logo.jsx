import PropTypes from 'prop-types';
import book from 'assets/img/bookwhite.png';

export const Logo = ({ textExtra = '', imageExtra = '' }) => (
    <div className="flex items-center">
      <img
        src={book}
        alt="Logo"
        className={`md:px-1 px-1 md:h-12 h-10 ${imageExtra}`}
        style={{ width: 'auto' }}
      />
      <span className={`text-white font-dm md:text-4xl text-2xl ${textExtra}`}>doc</span>
      <span className={`text-primaryRed font-architects md:text-4xl text-2xl italic ${textExtra}`}>
        -xandria
      </span>
    </div>
  );
  
  // Define prop types for the Logo component
  Logo.propTypes = {
    textExtra: PropTypes.string,
    imageExtra: PropTypes.string,
  };
  
  export default Logo;