import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from 'contexts/user/AuthContext';
import { LibraryProvider } from 'contexts/libraries/LibraryContext';

import AdminLayout from 'layouts/admin';
import AuthLayout from 'layouts/auth';
import MarketingHome from 'views/MarketingHome';

import ErrorBoundary from 'contexts/ErrorHandling/ErrorHandler';

const App = () => {
  return (
    <ErrorBoundary> {/* ErrorBoundary component to catch and handle errors in the app */}
      <AuthProvider> {/* Provides authentication context to the app */}
        <LibraryProvider> {/* Provides library context to the app */}
          <Routes>
            {/* Define routes and their corresponding components */}
            <Route path="auth/*" element={<AuthLayout />} /> {/* Routes under the 'auth' layout */}
            <Route path="admin/*" element={<AdminLayout />} /> {/* Routes under the 'admin' layout */}
            <Route path="/signin" element={<Navigate to="/admin" replace />} /> {/* Redirect '/signin' to '/admin' to see if user is already logged in */}
            <Route path="/login" element={<Navigate to="/admin" replace />} /> {/* Redirect '/login' to '/admin' to see if user is already logged in */}
            <Route path="/app" element={<Navigate to="/admin" replace />} /> {/* Redirect '/app' to '/admin' */}
            <Route path="/" element={<MarketingHome />} /> {/* Render 'MarketingHome' { Our internal marketing page } for the root path */}
          </Routes>
        </LibraryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
