import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import SearchResults from './SearchResults';

const SearchBar = ({ placeHolder = 'search', instructions = '', setSearchOpen }) => {
  const [filterText, setFilterText] = useState('');
  const inputRef = useRef(null);

  // Focus the input field on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="text-white">
      <div onClick={() => setSearchOpen(false)}>
        <div className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70" />
      </div>

      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-gray-light py-5 rounded-lg shadow-lg text-white z-50 px-4 w-[90%] xl:w-[800px] max-h-screen overflow-y-auto module-content scrollbar-hide">
        <div className="flex flex-wrap">
          <div className="relative mb-0 pb-0 w-full">
            <input
              type="text"
              placeholder={placeHolder}
              ref={inputRef}
              className="w-full py-2 px-4 bg-gray-light bg-opacity-80 rounded-lg text-gray-300 ring-white
                focus:outline-none focus:bg-gray-light focus:bg-opacity-80 focus:ring-2 focus:ring-gray-light
                ::placeholder:text-red-500"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            {filterText && (
              <button
                className="absolute inset-y-0 right-0 p-2 focus:outline-none"
                onClick={() => setFilterText('')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.121 8.121a.5.5 0 01.707 0L10 10.293l1.172-1.172a.5.5 0 01.707.707L10.707 11l1.172 1.172a.5.5 0 01-.707.707L10 11.707l-1.172 1.172a.5.5 0 01-.707-.707L9.293 11l-1.172-1.172a.5.5 0 010-.707z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          <span className="pt-2 text-sm italic text-gray-300">
            {instructions ? instructions : `To search all contents of an entry try deep search using-> ds:<your query>`}
          </span>
          {/* Removed until deepsearch feature is fully released  */}
          {/* <span className="pb-2 text-sm italic text-gray-300">
            {`Or ctrl+shift+d to activate deepSearch`}
          </span> */}
          <div className="my-2 h-px bg-gray-300 dark:bg-white/30 w-full" />

          <SearchResults query={filterText} />
        </div>
      </div>
    </div>
  );
};

// PropTypes for SearchBar component
SearchBar.propTypes = {
  placeHolder: PropTypes.string,
  instructions: PropTypes.string,
  setSearchOpen: PropTypes.func.isRequired,
};

export default SearchBar;
