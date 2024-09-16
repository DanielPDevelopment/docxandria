import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiExpandAlt, BiCollapseAlt } from 'react-icons/bi';
import { CiLink, CiTrash } from 'react-icons/ci';
import LibraryDetailEntry from './LibraryDetailEntry';
import { useLibrary } from 'contexts/libraries/LibraryContext';
import { useAuth } from 'contexts/user/AuthContext';

const LibraryEntry = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { removeLibrary } = useLibrary();
  const { user } = useAuth();

  // To keep track of seen items and filter out duplicates
  const seenItems = new Set();
  const filteredData = data?.entry?.filter((entry) => {
    const title = entry.title;
    if (seenItems.has(title)) {
      return false;
    } else {
      seenItems.add(title);
      return true;
    }
  });

  return (
    <div className="bg-grayLighter md:w-full p-4 lg:p-10 rounded-lg xl:px-20 shadow-xl w-full xl:w-[80%] px-0 md:px-10 text-white flex flex-wrap overflow-hidden">
      <div className="flex flex-wrap justify-between w-[calc(100%-100px)] items-center">
        <div className="flex flex-wrap items-center">
          <div className="h-full mr-4">
            <img
              src={data?.icoLink}
              alt="Library Icon"
              className="max-h-[50px]"
            />
          </div>
          <div className="text-2xl">{data?.name}</div>
          {showDetails ? (
            <BiCollapseAlt
              className="text-3xl cursor-pointer hover:text-primaryBlue ml-4"
              onClick={() => setShowDetails(false)}
            />
          ) : (
            <BiExpandAlt
              className="text-3xl cursor-pointer hover:text-primaryBlue ml-4"
              onClick={() => setShowDetails(true)}
            />
          )}
        </div>

        <div className="flex flex-wrap justify-between w-full items-center px-4 py-2">
          <div className="w-full text-grayBlue">Entries: {filteredData?.length || 0}</div>
          {data.description}
        </div>
      </div>

      <div className="flex flex-wrap w-[100px] items-center justify-end">
        <CiLink
          className="text-3xl cursor-pointer hover:text-primaryBlue"
          onClick={() => window.open(data?.url)}
        />
        {user && !user?.restricted ? (
          <CiTrash
            onClick={() => removeLibrary({ libraryId: data._id })}
            className="text-3xl cursor-pointer hover:text-primaryRed"
          />
        ) : null}
      </div>

      {showDetails ? (
        <div className="flex flex-wrap justify-between w-full items-center px-4 py-2">
          {filteredData?.map((entry) => (
            <LibraryDetailEntry key={entry?._id} data={entry} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

// PropTypes for LibraryEntry component
LibraryEntry.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icoLink: PropTypes.string,
    description: PropTypes.string,
    entry: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        keywords: PropTypes.array,
      })
    ),
  }).isRequired,
};

export default LibraryEntry;
