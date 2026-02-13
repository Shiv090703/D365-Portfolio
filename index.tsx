import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add Material Icons link dynamically if not present
const linkId = 'material-icons-link';
if (!document.getElementById(linkId)) {
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  document.head.appendChild(link);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
