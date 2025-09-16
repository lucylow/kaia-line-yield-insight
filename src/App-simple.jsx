import React, { useState } from 'react';
import { SimpleWalletProvider, useWallet } from './providers/SimpleWalletProvider';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from './components/ui/Card';
import { ErrorBoundary } from './components/ErrorBoundary';
import { cn } from './lib/utils';

function AppContent() {
  const { address, isConnected, connect, disconnect, balanceFormatted, symbol } = useWallet();
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
          </div>
        );
      case 'wallet-demo':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Wallet Connection Demo
            </h2>
            <p className="text-gray-600 mb-8">
              This is where the wallet connection demo would be
            </p>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Default Content
            </h2>
          </div>
        );
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
                  onClick={() => setActiveTab(item.id)}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
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

export default App
