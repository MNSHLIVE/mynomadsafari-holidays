
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/error-boundary';
import { Toaster } from './components/ui/toaster';

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
      <Toaster />
    </ErrorBoundary>
  </React.StrictMode>
);
