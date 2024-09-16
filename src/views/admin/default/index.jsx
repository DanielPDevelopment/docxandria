import React, { useEffect } from 'react';
import { useSearchToggle } from '../../../hooks/useSearchToggle';
import { useLibrary } from 'contexts/libraries/LibraryContext';
import SearchBar from 'components/search/SearchBar';
import useFetchUser from 'hooks/useFetchUser';
import LibraryList from 'components/libraries/LibraryList';
import AddLibraryForm from '../../../components/forms/AddLibraryForm';
import Result from 'components/results/Result';
import LibrariesAll from 'components/libraries/LibrariesAll';
import LoadingDialog from 'components/loading/LoadingDialog';
import ResultPlaceholder from 'components/results/ResultPlaceHolder';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Dashboard component
const Dashboard = () => {
  const [searchOpen, setSearchOpen] = useSearchToggle(false);
  const {
    getLibraries,
    addingLibrary,
    removeFromActiveResults,
    activeResults,
    seeLibraries,
    isLoading,
    loadingMessage,
  } = useLibrary();
  const [parent] = useAutoAnimate();
  useFetchUser();

  // Fetch libraries when component mounts
  useEffect(() => {
    getLibraries();
  }, []);

  return (
    <div
      className="items-start min-h-screen w-full flex justify-start content-start flex-wrap mt-20"
    >
      {/* Loading dialog */}
      {isLoading && (
        <LoadingDialog message={loadingMessage} />
      )}

      {/* Search bar toggle */}
      {!searchOpen ? (
        <div
          className="fixed top-0 left-1/2 transform -translate-x-1/2 py-5 rounded-lg text-white z-50 px-4 w-[90%] xl:w-[800px] max-h-screen overflow-y-auto module-content scrollbar-hide flex flex-wrap justify-center"
        >
          <div
            className="whitespace-pre-wrap p-4 font-mono text-grayBlue/50 m-auto text-sm cursor-pointer"
            onClick={() => setSearchOpen(true)}
          >
            {'< Search: ctrl + shift + s >'}
          </div>
        </div>
      ) : (
        <SearchBar
          instructions=""
          setSearchOpen={setSearchOpen}
        />
      )}

      {/* Main content */}
      <div ref={parent} className="w-full">
        {addingLibrary ? (
          <AddLibraryForm />
        ) : seeLibraries ? (
          <LibrariesAll />
        ) : (
          <>
            <div className="w-full flex flex-wrap justify-center">
              <div className="font-architects w-full mt-10 px-0 md:px-10 text-white flex flex-wrap">
                <LibraryList />
                {activeResults.length ? (
                  <div ref={parent} className="w-full">
                    {activeResults.map((result) => (
                      <Result
                        data={result}
                        key={result._id}
                        removeFromActiveResults={removeFromActiveResults}
                      />
                    ))}
                  </div>
                ) : (
                  <ResultPlaceholder
                    message={`Waiting on results \nActivate mic to listen for queries.`}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
