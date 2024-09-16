import React, { useState, useEffect } from 'react';
import { useLibrary } from 'contexts/libraries/LibraryContext';

const LibraryList = () => {
  const {
    allLibraries,
    activeLibraries,
    setActiveLibraries,
    setAddingLibrary,
  } = useLibrary();
  
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Handle library selection
  const handleSelect = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
      setActiveLibraries(activeLibraries.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
      setActiveLibraries([...activeLibraries, option]);
    }
  };

  // Handle selecting or deselecting all libraries
  const handleAll = () => {
    if ((activeLibraries.length !== allLibraries.length) && allLibraries?.length) {
      setActiveLibraries(allLibraries.map((lib) => lib.name));
      setSelected(allLibraries.map((lib) => lib.name));
    } else {
      setActiveLibraries([]);
      setSelected([]);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Update selected libraries when `allLibraries` changes
  useEffect(() => {
    setActiveLibraries(allLibraries.length ? allLibraries.map((lib) => lib.name) : []);
    setSelected(allLibraries.length ? allLibraries.map((lib) => lib.name) : []);
  }, [allLibraries]);

  return (
    <div className="relative font-poppins text-grayBlue mb-4">
      <label htmlFor="libs" className="text-sm text-gray-400 dark:text-white">
        {!activeLibraries?.length && (
          <p className="text-xs text-yellow-400">*No libraries selected.</p>
        )}
        Libraries
      </label>
      <div
        id="libs"
        className="border-lightGray mt-2 flex h-12 w-full items-center justify-between rounded-xl border bg-gray-light p-3 text-sm text-gray-400 mb-3 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>
          Selected: {activeLibraries?.length > 3 ? `${activeLibraries?.slice(-3)?.join(', ')}...` : activeLibraries?.length <= 3 ? activeLibraries?.join(', ') : 'None'}
        </span>
        <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="absolute mt-1 bg-white border border-lightGray rounded-xl shadow-lg z-10 text-black">
          {allLibraries?.length > 0 && (
            <div className="flex items-center p-2">
              <input
                type="checkbox"
                id="all"
                name="libs"
                value="All"
                checked={activeLibraries.length === allLibraries.length}
                className="mr-2"
                onChange={handleAll}
              />
              <label htmlFor="all" className="text-sm text-black">
                All
              </label>
            </div>
          )}
          {allLibraries?.length ? allLibraries.map((option) => (
            <div
              key={option._id}
              className="flex items-center p-2"
              onClick={() => handleSelect(option.name)}
            >
              <input
                type="checkbox"
                id={option._id}
                name="libs"
                value={option.name}
                checked={activeLibraries?.includes(option.name)}
                onChange={() => handleSelect(option.name)}
                className="mr-2"
              />
              <label htmlFor={option.name} className="text-sm text-black">
                {option.name}
              </label>
            </div>
          )) : null}
          <div
            className="p-2 cursor-pointer font-mono"
            onClick={() => {
              setAddingLibrary('addLibrary');
              setIsOpen(false);
            }}
          >
            Add Library
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryList;
