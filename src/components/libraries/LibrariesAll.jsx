import React from 'react';
import { IoReturnDownBack } from 'react-icons/io5';
import { useLibrary } from 'contexts/libraries/LibraryContext';
import LibraryEntry from './LibraryEntry';
import ResultPlaceholder from 'components/results/ResultPlaceHolder';


const LibrariesAll = () => {
  const {
    allLibraries,
    setAddingLibrary,
    setSeeLibraries,
  } = useLibrary();

  return (
    <div className="w-full flex flex-wrap justify-center my-10">
      <div className="flex flex-wrap justify-start w-full xl:w-[80%] mb-10">
        <IoReturnDownBack
          className="text-2xl text-white cursor-pointer hover:text-primaryBlue"
          onClick={() => {
            setAddingLibrary(false);
            setSeeLibraries(false);
          }}
        />
      </div>
      {allLibraries && allLibraries.length ? (
        allLibraries.map((library) => (
          <div
            className="w-full flex flex-wrap justify-center py-4"
            key={library._id}
          >
            <LibraryEntry data={library} />
          </div>
        ))
      ) : (
        <div className="w-full flex flex-wrap justify-center py-4">
          <div
            onClick={() => setAddingLibrary(true)}
            className="md:w-full p-4 lg:p-10 rounded-lg xl:px-20 w-full xl:w-[80%] px-0 md:px-10 flex flex-wrap overflow-hidden cursor-pointer"
          >
            <ResultPlaceholder
              message="No Libraries have been added to your collection\nClick here to add libraries to get started"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LibrariesAll;
