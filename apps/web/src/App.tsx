import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SimpleWalletProvider } from './providers/SimpleWalletProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppRoutes } from './router/routes';
import { AppLayout } from './layouts/AppLayout';
import { performanceService } from './services/performanceService';
import { languageDetectionService } from './services/languageDetectionService';
import './i18n';

// @lovable:main-app-component

function AppContent() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function App() {
  // Initialize performance optimizations and language detection
  React.useEffect(() => {
    performanceService.init();
    languageDetectionService.initialize();
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
