import React from 'react';
import MainDashboard from 'views/admin/default';
import SignIn from 'views/auth/SignIn';
import SignUp from 'views/auth/SignUp';

import { MdHome, MdLock } from 'react-icons/md';
import MarketingHome from 'views/MarketingHome';

// Define the route configuration for the application
const routes = [
  {
    name: 'Home',
    layout: '/', // Base layout for marketing pages
    path: 'sign-up',
    icon: <MdLock className="h-6 w-6" />, // Icon for sign-up route
    component: <MarketingHome />, // Component to render for the home route
  },
  {
    name: 'Main Dashboard',
    layout: '/admin', // Layout for admin dashboard
    path: 'default',
    icon: <MdHome className="h-6 w-6" />, // Icon for the main dashboard route
    component: <MainDashboard />, // Component to render for the main dashboard
  },
  {
    name: 'Sign In',
    layout: '/auth', // Layout for authentication pages
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />, // Icon for sign-in route
    component: <SignIn />, // Component to render for the sign-in route
  },
  {
    name: 'Sign Up',
    layout: '/auth', // Layout for authentication pages
    path: 'sign-up',
    icon: <MdLock className="h-6 w-6" />, // Icon for sign-up route
    component: <SignUp />, // Component to render for the sign-up route
  },
];

export default routes;
