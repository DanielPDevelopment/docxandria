import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from 'components/footer/Footer';
import routes from 'routes.js';
import useFetchUser from 'hooks/useFetchUser';

// Function to get active navbar based on current URL
const getActiveNavbar = (routes) => {
  let activeNavbar = false;
  const currentUrl = window.location.href;

  for (const route of routes) {
    if (currentUrl.includes(route.layout + route.path)) {
      return route.secondary;
    }
  }
  return activeNavbar;
};

// Function to get route elements based on layout
const getRoutes = (routes) =>
  routes
    .filter((route) => route.layout === '/admin' || route.layout === '/projects')
    .map((route) => (
      <Route path={`/${route.path}`} element={route.component} key={route.path} />
    ));

export default function Admin(props) {
  const { ...rest } = props; // Extract any additional props
  const [open, setOpen] = useState(true);
  const [currentRoute] = useState('Main Dashboard');
  
  useFetchUser();

  useEffect(() => {
    // Handle window resize to toggle sidebar visibility
    const handleResize = () => {
      setOpen(window.innerWidth >= 1200);
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Set document direction to LTR
    document.documentElement.dir = 'ltr';
  }, []);

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full bg-lightGray dark:bg-navy-900">
        {/* Main Content */}
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2">
          {/* Navbar */}
          <Navbar
            onOpenSidenav={() => setOpen(true)}
            logoText=""
            brandText={currentRoute}
            secondary={getActiveNavbar(routes)}
            {...rest}
          />

          <div className="mx-auto mb-auto h-full min-h-screen p-2 md:pr-2">
            {/* Routes */}
            <Routes>
              {getRoutes(routes)}
            </Routes>
          </div>

          <div className="p-3">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
