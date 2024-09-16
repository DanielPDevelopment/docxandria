import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for library management
const LibaryContext = createContext();

// Define API base URL based on environment
const API = process.env.REACT_APP_DEVELOPMENT == 'true'
    ? process.env.REACT_APP_DEV_DOMAIN + 'api/libraries/'
    : process.env.REACT_APP_PROD_DOMAIN + 'api/libraries/';

// Provider component to manage library state and actions
export function LibraryProvider({ children }) {
    const [activeResults, setActiveResults] = useState([]);
    const [activeLibraries, setActiveLibraries] = useState([]);
    const [allLibraries, setAllLibraries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addingLibrary, setAddingLibrary] = useState(false);
    const [seeLibraries, setSeeLibraries] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    // Load library data from localStorage on mount
    useEffect(() => {
        setIsLoading(true);
        const storedActiveResults = localStorage.getItem('activeResults');
        if (storedActiveResults) {
            setActiveResults(JSON.parse(storedActiveResults));
        }
        const storedActiveLibraries = localStorage.getItem('activeLibraries');
        if (storedActiveLibraries) {
            setActiveLibraries(JSON.parse(storedActiveLibraries));
        }
        const storedAllLibraries = localStorage.getItem('allLibraries');
        if (storedAllLibraries) {
            setAllLibraries(JSON.parse(storedAllLibraries));
        }
        setIsLoading(false);
    }, []);

    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
    });

    const fetchData = async (endpoint, method, body) => 
        await fetch(endpoint, { method, headers: getHeaders(), body });

    const addToActiveResults = ({ data }) => {
        const parsedData = JSON.parse(data)[0];
    
        setActiveResults(prevResults => {
            // Check if parsedData._id is already in the array
            if (prevResults?.some(item => item._id === parsedData._id)) {
                return prevResults;
            } else {
                return prevResults ? [parsedData, ...prevResults ] : [parsedData];
            }
        });
    };

    const removeFromActiveResults = ({ data }) => {
        setActiveResults(prevResults => {
            if (prevResults?.includes(data)) {
                return prevResults.filter(item => item !== data);
            }
        });
    };

    const getLibraries = async () => {
        let data;
        try {
            setIsLoading(true);
            setLoadingMessage('Retrieving Libraries...');
            const response = await fetchData(API, 'GET');
            data = await response.json();
            setAllLibraries(data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
            return data;
        }
    };

    const addLibrary = async (formData) => {
        let data;
        try {
            setIsLoading(true);
            setLoadingMessage('Ingesting Library...\nPlease note, this can take ~60 seconds depending on library size');
            const response = await fetchData(API + 'library/add', 'POST', JSON.stringify(formData));
            data = await response.json();
            if (!data.errors) {
                setAllLibraries(data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
            return data;
        }
    };

    const removeLibrary = async (formData) => {
        let data;
        try {
            setIsLoading(true);
            setLoadingMessage('Removing Library...');
            const response = await fetchData(API + 'library/remove', 'POST', JSON.stringify(formData));
            data = await response.json();
            if (!data.errors) {
                setAllLibraries(data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    const SuperQuery = async (query) => {
        let data;
        try {
            const response = await fetchData(API + 'library/search', 'POST', JSON.stringify(query));
            data = await response.json();
            console.log(data);
        } catch (err) {
            // Handle errors if necessary
        }
    };

    return (
        <LibaryContext.Provider
            value={{
                getLibraries,
                activeResults,
                setActiveResults,
                addToActiveResults,
                removeFromActiveResults,
                activeLibraries,
                setActiveLibraries,
                allLibraries,
                isLoading,
                addLibrary,
                addingLibrary,
                setAddingLibrary,
                seeLibraries, 
                setSeeLibraries,
                loadingMessage, 
                setLoadingMessage,
                removeLibrary,
                SuperQuery,
            }}
        >
            {children}
        </LibaryContext.Provider>
    );
}

// Custom hook to access library context
export function useLibrary() {
    return useContext(LibaryContext);
}
