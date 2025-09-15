import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { YieldStrategies } from './pages/YieldStrategies';
import { NFTMarketplace } from './pages/NFTMarketplace';
import { ReferralSystem } from './pages/ReferralSystem';
import { TransactionHistory } from './pages/TransactionHistory';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { Layout } from './components/Layout';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/strategies" element={<YieldStrategies />} />
          <Route path="/nft" element={<NFTMarketplace />} />
          <Route path="/referral" element={<ReferralSystem />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
