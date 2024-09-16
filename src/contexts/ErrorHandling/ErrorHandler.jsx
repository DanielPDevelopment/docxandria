import React, { useState, useEffect } from "react";
import { connectHelpGeneral } from "hooks/InfoAndMeta/useSystems";
import Logo from "components/brand/Logo";

// Helper function to clear local storage and sign out the user
const signout = () => {
    localStorage.clear();
}

// Fallback component to display when an error occurs
export const ErrorFallback = ({ error, showHelp, setShowHelp }) => (
    <div className="bg-lightGray min-h-screen flex flex-col items-center justify-center md:px-0 px-2">
        <div className="fixed top-0 left-0 p-4 z-50">
            <div className="flex items-end pb-2">
                <Logo /> {/* Display logo at the top of the page */}
            </div>
        </div>
        <div className="bg-grayLighter p-6 rounded-lg md:p-10 md:w-2/3 w-full shadow-xl">
            <div className="flex flex-col items-start mb-4">
                <div className="text-primaryYellow font-poppins md:text-[50px] text-4xl">Don't Panic!</div>
                <div className="text-primaryBlue font-mono text-xs">Just a tiny little error.</div>
            </div>
            <div className="text-grayBlue font-mono text-md">
                Something went wrong, but don't worry, we've caught it.
            </div>
            <div className="text-grayBlue font-mono mb-2 text-md">
                Let's sort this out together.
            </div>
            <div className="flex flex-wrap items-center mb-4 text-grayBlue text-md">
                <div className="">Would you like to </div>
                <button
                    className='px-2 linear rounded-xl py-2 text-md text-primaryBlue transition duration-200 hover:text-secondaryBlue'
                    type='submit'
                    onClick={() => window.location.reload()} // Refresh the page
                >
                    Refresh the page
                </button>
                <div className="text-md">or</div>
                <button
                    className='px-2 linear rounded-xl py-2 text-md text-primaryBlue transition duration-200 hover:text-secondaryBlue'
                    type='submit'
                    onClick={() => {
                        signout(); // Sign out the user
                        window.location.reload(); // Refresh the page
                    }}
                >
                    Sign out?
                </button>
            </div>
            <div className="w-full">
                {connectHelpGeneral({
                    showHelp,
                    setShowHelp,
                    codeLanguage: 'bash',
                    code: `${error?.error?.stack?.split(':')[0]
                        ? 'Type: ' +
                        error?.error?.stack?.split(':')[0] +
                        '\n' +
                        'Message:' +
                        error?.error?.stack?.split(
                            error?.error?.stack?.split(':')[0]
                        )[1]
                        : error?.message || error?.reason?.stack
                        } `, // Display error stack trace
                    extra: 'w-full max-w-[100%] text-white',
                    orientation: 'bottom',
                    standardHelpMessage: '',
                    CallOut: "What's this error?",
                    iconColor: 'red-700',
                    extraCallOut: '!text-center font-poppins text-primaryRed',
                })}
            </div>
        </div>
    </div>
);

// Error boundary component to catch and handle errors in the component tree
const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        const errorHandler = (error) => {
            // Set error state and display error fallback UI
            setError(error);
            setHasError(true);
        };

        // Add event listeners for global error handling
        window.addEventListener("error", errorHandler);
        window.addEventListener('unhandledrejection', errorHandler);

        // Clean up event listeners on component unmount
        return () => {
            window.removeEventListener("error", errorHandler);
            window.removeEventListener('unhandledrejection', errorHandler);
        };
    }, []);

    return hasError ? 
        <ErrorFallback error={error} showHelp={showHelp} setShowHelp={setShowHelp} /> 
        : 
        children; // Render children if no error
};

export default ErrorBoundary;
