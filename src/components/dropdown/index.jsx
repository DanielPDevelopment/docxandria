import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function useOutsideAlerter(ref, setX, setAvatarOpen) {
  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
        setAvatarOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setX]);
}

const Dropdown = ({
  button,
  children,
  classNames = '',
  animation,
  openWrapper,
  setAvatarOpen,
  setOpenWrapper,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpenWrapper, setAvatarOpen);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onMouseDown={() => setOpenWrapper(prev => !prev)}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation || 'origin-top-right transition-all duration-300 ease-in-out'
        } ${openWrapper ? 'scale-100' : 'scale-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

// Define prop types for the Dropdown component
Dropdown.propTypes = {
  button: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
  animation: PropTypes.string,
  openWrapper: PropTypes.bool.isRequired,
  setAvatarOpen: PropTypes.func.isRequired,
  setOpenWrapper: PropTypes.func.isRequired,
};

export default Dropdown;
