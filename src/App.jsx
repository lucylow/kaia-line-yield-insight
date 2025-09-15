import React from 'react';
import LineYieldApp from './components/LineYieldApp';
import { ErrorBoundary } from './components/ErrorBoundary';

// @lovable:main-app-component

export default function App() {
  return (
    <ErrorBoundary>
      <LineYieldApp />
    </ErrorBoundary>
  );
}