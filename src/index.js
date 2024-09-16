import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';

import App from './App';

// Create the root element for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application into the root element
root.render(
  <Router> {/* Router component to handle routing */}
    <App /> {/* Main application component */}
  </Router>
);
