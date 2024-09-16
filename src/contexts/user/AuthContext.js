import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { helloWorld } from '../Welcome';

// Create an AuthContext for managing authentication state
const AuthContext = createContext();

// Determine API base URL based on environment
const API = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? process.env.REACT_APP_DEV_DOMAIN + 'api/users/'
  : process.env.REACT_APP_PROD_DOMAIN + 'api/users/';

// Determine base name for routing based on environment
const currentBaseName = JSON.parse(process.env.REACT_APP_DEVELOPMENT) 
  ? process.env.REACT_APP_BASENAME_DEV 
  : process.env.REACT_APP_BASENAME;

// Initial state for authentication
const initialState = {
  user: null,
  isLoading: false
}

// Reducer function to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SIGN_OUT':
      return { ...state, user: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// AuthProvider component to provide authentication context to its children
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const storedUser = localStorage.getItem('authUser');
    if (storedUser && storedUser !== "undefined") {
      dispatch({ type: "SET_USER", payload: JSON.parse(storedUser) });
    } else {
      // Redirect to login if no user is found and not on the sign-up page or base path
      if (window.location.pathname !== '/auth/sign-up' && !localStorage.getItem('token') && window.location.pathname !== currentBaseName + '/') {
        navigateToLogin();
      }
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }, [navigate]);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('authUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [state.user]);

  // Redirect to login page
  const navigateToLogin = () => window.location.href = currentBaseName + '/#/auth/sign-in';

  // Sign out user, clear localStorage, and redirect to login
  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
    localStorage.clear();
    navigateToLogin();
  };

  // Generate headers for API requests
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token'),
  });

  // Perform a fetch request with specified endpoint, method, and body
  const fetchData = async (endpoint, method, body) => await fetch(endpoint, { method, headers: getHeaders(), body });

  // Validate the user state and handle loading state
  const validateUser = () => {
    if (!state.isLoading && state.user) {
      return true;
    } else if (state.isLoading) {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        dispatch({ type: "SET_USER", payload: JSON.parse(storedUser) });
      } else {
        return false;
      }
      return true;
    }
  };

  // Fetch user data and handle potential sign-out
  const getUser = async () => {
    let data;
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetchData(API, 'GET');
      data = await response.json();
      if (data?.msg === 'Token is not valid' || data?.msg === 'User not found') {
        signOut();
      }
      dispatch({ type: "SET_USER", payload: data });
    } catch (error) {
      signOut();
      navigateToLogin();
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      return data;
    }
  };

  // Sign up a new user and handle navigation on success
  const signUp = async (userData) => {
    let data;
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetchData(API + 'register', 'POST', JSON.stringify(userData));
      data = await response.json();
      dispatch({ type: "SET_USER", payload: data });
      if (data.firstname && data.email) {
        localStorage.setItem('token', data.token);
        // Redirect to the dashboard
        window.location.href = currentBaseName + '/#/admin/default';
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
    return data;
  };

  // Sign in a user and handle navigation on success
  const signIn = async (userData) => {
    let data;
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetchData(API, 'POST', JSON.stringify(userData));
      data = await response.json();
      dispatch({ type: "SET_USER", payload: data });
      if (data.email && data.firstname) {
        localStorage.setItem('token', data.token);
        // Redirect to the dashboard
        window.location.href = currentBaseName + '/#/admin/default';
      }
    } catch (error) {
      throw error;
    } finally {
      helloWorld(); // Display welcome messages in dev console
      dispatch({ type: "SET_LOADING", payload: false });
    }
    return data;
  };

  // Provide authentication context values to children components
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        signIn,
        signOut,
        signUp,
        validateUser,
        getUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context
export function useAuth() {
  return useContext(AuthContext);
}
