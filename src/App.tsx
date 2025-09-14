import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ROUTES } from './utils/routes';

// Import pages
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { LoanPage } from './pages/LoanPage';
import { ReferralPage } from './pages/ReferralPage';
import { NFTPage } from './pages/NFTPage';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Help } from './pages/Help';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

// Import additional pages user mentioned
import KaiaPaymentPage from './pages/KaiaPaymentPage';
import { QRPaymentPage } from './pages/QRPaymentPage';
import TradePage from './pages/TradePage';
import { TokenManagementPage } from './pages/TokenManagementPage';
import { MiniDappDemo } from './pages/MiniDappDemo';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.HOME} element={<Landing />} />
        <Route path={ROUTES.HELP} element={<Help />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        
        {/* Additional public routes for demos */}
        <Route path="/payment-demo" element={<QRPaymentPage />} />
        <Route path="/kaia-payments" element={<KaiaPaymentPage />} />
        <Route path="/kaia-defi" element={<MiniDappDemo />} />
        <Route path="/trade-earn" element={<TradePage />} />
        <Route path="/verification" element={<TokenManagementPage />} />
        
        {/* Protected routes with layout */}
        <Route element={<Layout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.LOANS} element={<LoanPage />} />
          <Route path={ROUTES.REFERRAL} element={<ReferralPage />} />
          <Route path={ROUTES.NFT} element={<NFTPage />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Route>
        
        {/* Catch all route */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Router>
  );
}

export default App;