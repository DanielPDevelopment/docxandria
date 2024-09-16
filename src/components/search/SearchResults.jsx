import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useLibrary } from 'contexts/libraries/LibraryContext';
import { useArrowKeys } from 'hooks/useArrowKeys';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const SearchResults = ({ query, deepSearch = true }) => {
  const { allLibraries, SuperQuery } = useLibrary();
  const [searchResults, setSearchResults] = useState([]);
  const [locationIndex, setMaxIndex, setTarget] = useArrowKeys(0);
  const resultsRefs = useRef([]);
  const [parent] = useAutoAnimate();

  // Perform search when query changes
  useEffect(() => {
    handleSearch();
  }, [query]);

  // Update max index for arrow key navigation
  useEffect(() => {
    setMaxIndex(searchResults.length);
  }, [searchResults, setMaxIndex]);

  // Scroll the result into view when locationIndex changes
  useEffect(() => {
    if (searchResults.length) {
      setTarget(searchResults[locationIndex]?.url || null);
      if (resultsRefs.current[locationIndex]) {
        resultsRefs.current[locationIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [locationIndex, searchResults, setTarget]);

  /**
   * Handles the search functionality, differentiating between deep search and regular search.
   */
  const handleSearch = () => {
    let isDeepSearch = query.includes('ds:');
    if (isDeepSearch) {
      query = query.split('ds:')[1];
    }

    const searchQuery = query.toLowerCase();
    if (searchQuery && allLibraries.length) {
      const titles = new Set();
      const results = allLibraries
        .map(lib => {
          if (isDeepSearch) {
            return lib.entry?.filter(item =>
              item.content.toLowerCase().includes(searchQuery)
            );
          } else {
            return lib.entry?.filter(item =>
              item.title.toLowerCase().includes(searchQuery)
            );
          }
        })
        .flat()
        .filter(item => {
          if (!titles.has(item.title)) {
            titles.add(item.title);
            return true;
          }
          return false;
        })
        .slice(0, 20);

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="w-full h-full" ref={parent}>
      {searchResults.length ? (
        searchResults.map((result, index) => (
          <div
            key={result?._id || index}
            className={`flex flex-wrap justify-between items-center mb-4 text-grayBlue ${
              index === locationIndex ? '!text-primaryBlue' : 'hover:text-white cursor-pointer'
            }`}
            onClick={() => window.open(result?.url)}
            ref={el => (resultsRefs.current[index] = el)}
          >
            <div className="flex flex-wrap items-center">
              <img src={result?.libIco} className="max-h-[20px] mr-2" alt="Library Icon" />
              <div>
                {result?.title} - <span className="text-xs">{result?.lib}</span>
              </div>
            </div>
            <div>
              {result?.content?.slice(0, 200).replace(/\b\w{21,}\b/g, '')}
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

// PropTypes for SearchResults component
SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  deepSearch: PropTypes.bool,
};

export default SearchResults;
