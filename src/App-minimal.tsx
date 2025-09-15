import React, { useState } from 'react';
import { WalletProvider, useWallet } from './providers/WalletProvider';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from './components/ui/Card';
import { Dashboard } from './components/Dashboard';
import { YieldStrategies } from './components/YieldStrategies';
import { NFTMarketplace } from './components/NFTMarketplace';
import { ReferralSystem } from './components/ReferralSystem';
import { TransactionHistory } from './components/TransactionHistory';
import { ErrorBoundary } from './components/ErrorBoundary';

function AppContent() {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'strategies' | 'nft' | 'referral' | 'transactions'>('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">LINE Yield</h1>
            </div>
            <div className="flex items-center space-x-4">
              {wallet.isConnected ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                  </span>
                  <span className="text-sm text-gray-600">
                    Balance: {wallet.balance} USDT
                  </span>
                  <Button variant="outline" onClick={disconnectWallet}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button onClick={connectWallet}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 overflow-x-auto">
            {[
              { id: 'home', label: 'Home' },
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'strategies', label: 'Strategies' },
              { id: 'nft', label: 'NFT' },
              { id: 'referral', label: 'Referral' },
              { id: 'transactions', label: 'History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to LINE Yield
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              A decentralized yield farming platform integrated with LINE ecosystem
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Yield Farming</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Earn rewards by providing liquidity to various DeFi protocols
                  </p>
                  {wallet.isConnected && (
                    <Button className="w-full mt-4">
                      Start Farming
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">NFT Collateral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Use your NFTs as collateral for loans and yield generation
                  </p>
                  {wallet.isConnected && (
                    <Button className="w-full mt-4" variant="outline">
                      View NFTs
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Referral System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Invite friends and earn rewards from their activities
                  </p>
                  {wallet.isConnected && (
                    <Button className="w-full mt-4" variant="outline">
                      Invite Friends
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : activeTab === 'dashboard' ? (
          <Dashboard />
        ) : activeTab === 'strategies' ? (
          <YieldStrategies />
        ) : activeTab === 'nft' ? (
          <NFTMarketplace />
        ) : activeTab === 'referral' ? (
          <ReferralSystem />
        ) : activeTab === 'transactions' ? (
          <TransactionHistory />
        ) : null}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 LINE Yield. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </ErrorBoundary>
  );
}

export default App;
