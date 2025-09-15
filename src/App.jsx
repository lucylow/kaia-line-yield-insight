import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Landing from './pages/Landing';
import LineYieldApp from './components/LineYieldApp';

// @lovable:main-app-component

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<LineYieldApp />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}