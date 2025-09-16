import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Lazy load components for better performance
const Landing = lazy(() => import('../pages/Landing'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Analytics = lazy(() => import('../pages/Analytics'));
const RealTime = lazy(() => import('../pages/RealTime'));
const YieldStrategies = lazy(() => import('../pages/YieldStrategies'));
const NFTMarketplace = lazy(() => import('../pages/NFTMarketplace'));
const ReferralSystem = lazy(() => import('../pages/ReferralSystem'));
const TransactionHistory = lazy(() => import('../pages/TransactionHistory'));
const Payments = lazy(() => import('../pages/Payments'));
const Trading = lazy(() => import('../pages/Trading'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Nested routes for complex pages
const YieldStrategiesRoutes = lazy(() => import('../pages/YieldStrategies/routes').then(m => ({ default: m.YieldStrategiesRoutes })));
const NFTMarketplaceRoutes = lazy(() => import('../pages/NFTMarketplace/routes').then(m => ({ default: m.NFTMarketplaceRoutes })));
const TradingRoutes = lazy(() => import('../pages/Trading/routes').then(m => ({ default: m.TradingRoutes })));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        
        {/* Direct Access Routes - No Wallet Gate */}
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/analytics" element={<AppLayout />}>
          <Route index element={<Analytics />} />
        </Route>
        <Route path="/realtime" element={<AppLayout />}>
          <Route index element={<RealTime />} />
        </Route>
        <Route path="/strategies" element={<AppLayout />}>
          <Route index element={<YieldStrategies />} />
          <Route path="*" element={<YieldStrategiesRoutes />} />
        </Route>
        <Route path="/nft" element={<AppLayout />}>
          <Route index element={<NFTMarketplace />} />
          <Route path="*" element={<NFTMarketplaceRoutes />} />
        </Route>
        <Route path="/trading" element={<AppLayout />}>
          <Route index element={<Trading />} />
          <Route path="*" element={<TradingRoutes />} />
        </Route>
        <Route path="/referral" element={<AppLayout />}>
          <Route index element={<ReferralSystem />} />
        </Route>
        <Route path="/transactions" element={<AppLayout />}>
          <Route index element={<TransactionHistory />} />
        </Route>
        <Route path="/payments" element={<AppLayout />}>
          <Route index element={<Payments />} />
        </Route>
        <Route path="/profile" element={<AppLayout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/settings" element={<AppLayout />}>
          <Route index element={<Settings />} />
        </Route>
        
        {/* App Routes - No Wallet Gate */}
        <Route path="/app" element={<AppLayout />}>
          {/* Dashboard Routes */}
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="realtime" element={<RealTime />} />
          
          {/* Yield Strategies Routes */}
          <Route path="strategies/*" element={<YieldStrategiesRoutes />} />
          
          {/* NFT Marketplace Routes */}
          <Route path="nft/*" element={<NFTMarketplaceRoutes />} />
          
          {/* Trading Routes */}
          <Route path="trading/*" element={<TradingRoutes />} />
          
          {/* Other Routes */}
          <Route path="referral" element={<ReferralSystem />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

// Route configuration for navigation
export const routeConfig = {
  public: [
    { path: '/', label: 'Home', icon: '🏠', exact: true },
    { path: '/landing', label: 'Landing', icon: '🏠' },
  ],
  protected: [
    { path: '/app/dashboard', label: 'Dashboard', icon: '📊', exact: true },
    { path: '/app/analytics', label: 'Analytics', icon: '📈' },
    { path: '/app/realtime', label: 'Real-time', icon: '⚡' },
    { path: '/app/strategies', label: 'Yield Strategies', icon: '🌱' },
    { path: '/app/nft', label: 'NFT Marketplace', icon: '🎨' },
    { path: '/app/trading', label: 'Trading', icon: '📈' },
    { path: '/app/referral', label: 'Referral', icon: '🎯' },
    { path: '/app/transactions', label: 'History', icon: '📋' },
    { path: '/app/payments', label: 'Payments', icon: '💳' },
    { path: '/app/profile', label: 'Profile', icon: '👤' },
    { path: '/app/settings', label: 'Settings', icon: '⚙️' },
  ],
  nested: {
    strategies: [
      { path: '/app/strategies', label: 'Overview', icon: '📊' },
      { path: '/app/strategies/create', label: 'Create Strategy', icon: '➕' },
      { path: '/app/strategies/manage', label: 'Manage', icon: '⚙️' },
      { path: '/app/strategies/analytics', label: 'Analytics', icon: '📈' },
    ],
    nft: [
      { path: '/app/nft', label: 'Marketplace', icon: '🛒' },
      { path: '/app/nft/create', label: 'Create NFT', icon: '🎨' },
      { path: '/app/nft/my-nfts', label: 'My NFTs', icon: '👤' },
      { path: '/app/nft/collections', label: 'Collections', icon: '📚' },
    ],
    trading: [
      { path: '/app/trading', label: 'Trade', icon: '📈' },
      { path: '/app/trading/swap', label: 'Swap', icon: '🔄' },
      { path: '/app/trading/portfolio', label: 'Portfolio', icon: '💼' },
      { path: '/app/trading/history', label: 'History', icon: '📋' },
    ],
  },
};
