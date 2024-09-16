import React from 'react';
import PropTypes from 'prop-types';
import { LiaAssistiveListeningSystemsSolid } from 'react-icons/lia';
import { CiLink } from 'react-icons/ci';

const LibraryDetailEntry = ({ data }) => (
  <div className="w-full text-grayBlue">
    <div className="flex flex-wrap justify-between">
      <span className="flex flex-wrap items-center">
        {data?.title}
        <CiLink
          className="ml-1 text-lg hover:text-primaryBlue cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() => window.open(data.url)}
        />
      </span>
      <span className="flex flex-wrap items-center">
        <LiaAssistiveListeningSystemsSolid className="mr-2" />
        {data?.keywords}
      </span>
    </div>
  </div>
);

// PropTypes for LibraryDetailEntry component
LibraryDetailEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    keywords: PropTypes.array,
  }).isRequired,
};

export default LibraryDetailEntry;
