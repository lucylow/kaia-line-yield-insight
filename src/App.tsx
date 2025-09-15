import React, { useState } from 'react';
import { SimpleWalletProvider, useWallet } from './providers/SimpleWalletProvider';
import { NotificationProvider, useNotificationContext } from './providers/NotificationProvider';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from './components/ui/Card';
import { Dashboard } from './components/Dashboard';
import { YieldStrategies } from './components/YieldStrategies';
import { NFTMarketplace } from './components/NFTMarketplace';
import { ReferralSystem } from './components/ReferralSystem';
import { TransactionHistory } from './components/TransactionHistory';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { RealTimeDashboard } from './components/RealTimeDashboard';
import { MobileNavigation, DesktopSidebar } from './components/MobileNavigation';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NetworkBanner } from './components/NetworkBanner';
import WalletConnectButton from './components/WalletConnectButton.jsx';
import WalletConnectDemo from './pages/WalletConnectDemo';
import Landing from './pages/Landing';
import { cn } from './utils/cn';
import { performanceService } from './services/performanceService';

// @lovable:main-app-component

interface AppContentProps {}

function AppContent({}: AppContentProps) {
  const { address, isConnected, connect, disconnect, balanceFormatted, symbol } = useWallet();
  const { showSuccess, showError } = useNotificationContext();
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'strategies' | 'nft' | 'referral' | 'transactions' | 'payments' | 'trading' | 'analytics' | 'realtime' | 'wallet-demo'>('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'realtime', label: 'Real-time', icon: '⚡' },
    { id: 'strategies', label: 'Yield Strategies', icon: '🌱' },
    { id: 'nft', label: 'NFT Marketplace', icon: '🎨' },
    { id: 'referral', label: 'Referral', icon: '🎯' },
    { id: 'transactions', label: 'History', icon: '📋' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'trading', label: 'Trading', icon: '📈' },
    { id: 'wallet-demo', label: 'Wallet Demo', icon: '🔗' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Landing />;
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'realtime':
        return <RealTimeDashboard />;
      case 'strategies':
        return <YieldStrategies />;
      case 'nft':
        return <NFTMarketplace />;
      case 'referral':
        return <ReferralSystem />;
      case 'transactions':
        return <TransactionHistory />;
      case 'payments':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
                Payment System
              </h1>
              <p className="text-lg text-gray-600">QR code payments and blockchain transactions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">QR Code Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">Generate QR codes for instant payments</p>
                  <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    Generate QR Code
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Kaia Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">Send payments on Kaia blockchain</p>
                  <Button className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300" variant="outline">
                    Send Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'trading':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
                Trading & Earn
              </h1>
              <p className="text-lg text-gray-600">Trade tokens and earn rewards</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Token Swap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">Swap between different tokens</p>
                  <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    Start Swap
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Trading Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">Earn rewards for trading activities</p>
                  <Button className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300" variant="outline">
                    View Rewards
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'wallet-demo':
        return <WalletConnectDemo />;
      default:
        return <Dashboard />;
    }
  };

  // If we're on the landing page, render it directly without the app layout
  if (activeTab === 'home') {
    return <Landing onNavigate={(tab) => setActiveTab(tab as typeof activeTab)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mobile Navigation */}
      <MobileNavigation 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab as typeof activeTab)} 
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab as typeof activeTab)} 
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Desktop Header */}
        <header className="hidden lg:block bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">LY</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">LINE Yield</h1>
              </div>

              {/* Wallet Connect */}
              <div className="flex items-center space-x-4">
                {isConnected ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Balance: {balanceFormatted} {symbol}
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        disconnect();
                        showSuccess('Wallet Disconnected', 'Your wallet has been successfully disconnected.');
                      }}
                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      connect();
                      showSuccess('Wallet Connected', 'Your wallet has been successfully connected to Kaia network.');
                    }}
                    className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Network Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-4">
          <NetworkBanner />
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setActiveTab('strategies')} className="hover:text-emerald-600 transition-colors">Yield Farming</button></li>
                <li><button onClick={() => setActiveTab('nft')} className="hover:text-emerald-600 transition-colors">NFT Marketplace</button></li>
                <li><button onClick={() => setActiveTab('referral')} className="hover:text-emerald-600 transition-colors">Referral Program</button></li>
                <li><button onClick={() => setActiveTab('payments')} className="hover:text-emerald-600 transition-colors">Payment System</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Security Audit</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Discord</a></li>
                <li><a href="#" className="hover:text-gray-900">Telegram</a></li>
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Bug Reports</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Feature Requests</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600">
                © 2024 LINE Yield Platform. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
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
