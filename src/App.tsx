import React, { useState } from 'react';
import { SimpleWalletProvider, useWallet } from './providers/SimpleWalletProvider';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from './components/ui/Card';
import { Dashboard } from './components/Dashboard';
import { YieldStrategies } from './components/YieldStrategies';
import { NFTMarketplace } from './components/NFTMarketplace';
import { ReferralSystem } from './components/ReferralSystem';
import { TransactionHistory } from './components/TransactionHistory';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NetworkBanner } from './components/NetworkBanner';
import WalletConnectButton from './components/WalletConnectButton.jsx';
import WalletConnectDemo from './pages/WalletConnectDemo';
import { cn } from './utils/cn';

// @lovable:main-app-component

interface AppContentProps {}

function AppContent({}: AppContentProps) {
  const { address, isConnected, connect, disconnect, balanceFormatted, symbol } = useWallet();
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'strategies' | 'nft' | 'referral' | 'transactions' | 'payments' | 'trading' | 'wallet-demo'>('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
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
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to LINE Yield Platform
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              A comprehensive DeFi platform integrated with LINE ecosystem on Kaia blockchain
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">📊</span>
                    Portfolio Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Track your investments, earnings, and portfolio performance
                  </p>
                  <Button 
                    onClick={() => setActiveTab('dashboard')}
                    className="w-full"
                  >
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">🌱</span>
                    Yield Farming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Earn rewards by providing liquidity to various DeFi protocols
                  </p>
                  <Button 
                    onClick={() => setActiveTab('strategies')}
                    className="w-full"
                    variant="outline"
                  >
                    Start Farming
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">🎨</span>
                    NFT Marketplace
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Buy, sell, and use NFTs as collateral for loans
                  </p>
                  <Button 
                    onClick={() => setActiveTab('nft')}
                    className="w-full"
                    variant="outline"
                  >
                    Browse NFTs
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">🎯</span>
                    Referral System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Invite friends and earn rewards from their activities
                  </p>
                  <Button 
                    onClick={() => setActiveTab('referral')}
                    className="w-full"
                    variant="outline"
                  >
                    Invite Friends
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">💳</span>
                    Payment System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    QR code payments and Kaia blockchain transactions
                  </p>
                  <Button 
                    onClick={() => setActiveTab('payments')}
                    className="w-full"
                    variant="outline"
                  >
                    Try Payments
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">📈</span>
                    Trading & Earn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Trade tokens and earn rewards with every transaction
                  </p>
                  <Button 
                    onClick={() => setActiveTab('trading')}
                    className="w-full"
                    variant="outline"
                  >
                    Start Trading
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">🔗</span>
                    Wallet Connection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Connect with multiple wallet types including social logins and crypto wallets
                  </p>
                  <Button 
                    onClick={() => setActiveTab('wallet-demo')}
                    className="w-full"
                    variant="outline"
                  >
                    Try Wallet Demo
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-blue-600">$2.4M</p>
                  <p className="text-sm text-gray-600">Total Value Locked</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-green-600">8.5%</p>
                  <p className="text-sm text-gray-600">Average APY</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-purple-600">1,247</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-orange-600">15</p>
                  <p className="text-sm text-gray-600">Yield Strategies</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'dashboard':
        return <Dashboard />;
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
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment System</h2>
              <p className="text-gray-600">QR code payments and blockchain transactions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Generate QR codes for instant payments</p>
                  <Button className="w-full">Generate QR Code</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Kaia Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Send payments on Kaia blockchain</p>
                  <Button className="w-full" variant="outline">Send Payment</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'trading':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Trading & Earn</h2>
              <p className="text-gray-600">Trade tokens and earn rewards</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Swap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Swap between different tokens</p>
                  <Button className="w-full">Start Swap</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Trading Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Earn rewards for trading activities</p>
                  <Button className="w-full" variant="outline">View Rewards</Button>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LY</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">LINE Yield</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as typeof activeTab)}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

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
                  <Button variant="outline" onClick={disconnect}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button onClick={connect}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Network Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <NetworkBanner />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setActiveTab('strategies')} className="hover:text-gray-900">Yield Farming</button></li>
                <li><button onClick={() => setActiveTab('nft')} className="hover:text-gray-900">NFT Marketplace</button></li>
                <li><button onClick={() => setActiveTab('referral')} className="hover:text-gray-900">Referral Program</button></li>
                <li><button onClick={() => setActiveTab('payments')} className="hover:text-gray-900">Payment System</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
                <li><a href="#" className="hover:text-gray-900">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-gray-900">Security Audit</a></li>
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
                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Bug Reports</a></li>
                <li><a href="#" className="hover:text-gray-900">Feature Requests</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600">
                © 2024 LINE Yield Platform. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SimpleWalletProvider>
        <AppContent />
      </SimpleWalletProvider>
    </ErrorBoundary>
  );
}

export default App;
