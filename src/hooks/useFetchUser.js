import { useEffect } from 'react';
import { useAuth } from 'contexts/user/AuthContext';

/**
 * Custom hook to fetch user data on component mount.
 *
 * Uses the `getUser` function from the authentication context to fetch user data.
 */
function useFetchUser() {
  const { getUser } = useAuth();

  useEffect(() => {
    // Fetch user data when the component mounts
    getUser();
  }, []); // Run only on mount

  // No return value or cleanup needed
}

export default useFetchUser;
