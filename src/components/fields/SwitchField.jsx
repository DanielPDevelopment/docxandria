import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/switch';

// Custom SwitchField component
const SwitchField = (props) => {
  const { id, label, desc, mt, mb } = props;

  return (
    <div className={`flex justify-between ${mt} ${mb} items-center`}>
      <label
        htmlFor={id}
        className="max-w-[80%] hover:cursor-pointer lg:max-w-[65%]"
      >
        <h5 className="text-base font-bold text-navy-700 dark:text-white">
          {label}
        </h5>
        <p className="text-base text-gray-600">{desc}</p>
      </label>
      <div>
        <Switch id={id} />
      </div>
    </div>
  );
};

// PropTypes for SwitchField component
SwitchField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
};

export default SwitchField;
