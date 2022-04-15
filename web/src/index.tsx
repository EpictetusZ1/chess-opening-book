import React from 'react';
import App from './App';


// Migration to React v18.0.0
import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

