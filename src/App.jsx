import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SimpleWalletProvider } from './providers/SimpleWalletProvider';
import { UnifiedLandingPage } from './components/UnifiedLandingPage';
import DashboardPage from './pages/DashboardPage';
import NFTMarketplace from './pages/NFTMarketplace';
import ReferralPage from './pages/ReferralPage';
import TransactionHistory from './components/TransactionHistory';
import Help from './pages/Help';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// @lovable:main-app-component

export default function App() {
  return (
    <ErrorBoundary>
      <SimpleWalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<UnifiedLandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/loans" element={<DashboardPage />} />
            <Route path="/referral" element={<ReferralPage />} />
            <Route path="/nft" element={<NFTMarketplace />} />
            <Route path="/marketplace" element={<NFTMarketplace />} />
            <Route path="/history" element={<TransactionHistory />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Router>
      </SimpleWalletProvider>
    </ErrorBoundary>
  );
}