import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SimpleWalletProvider } from './providers/SimpleWalletProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppRoutes } from './router/routes';
import { AppLayout } from './layouts/AppLayout';
import { performanceService } from './services/performanceService';

// @lovable:main-app-component

function AppContent() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function App() {
  // Initialize performance optimizations
  React.useEffect(() => {
    performanceService.init();
  }, []);

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <SimpleWalletProvider>
          <AppContent />
        </SimpleWalletProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
