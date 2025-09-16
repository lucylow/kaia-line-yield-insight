import React, { useState } from 'react';
import { SimpleWalletProvider, useWallet } from '../providers/SimpleWalletProvider';
import { Wallet, TrendingUp, Shield, ArrowUp, ArrowDown, BarChart3, History, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import WalletConnectButton from './WalletConnectButton';

const LineYieldLogo = () => (
  <div className="line-yield-logo">
    <div className="w-10 h-10 bg-yield rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-lg">LY</span>
    </div>
    <span className="text-yield font-bold">LINE Yield</span>
  </div>
);

const BalanceCard = ({ balance = "7,840.50", currency = "USDT" }) => (
  <div className="mobile-card bg-gradient-to-br from-white to-yield-bg">
    <div className="text-center space-y-4">
      <h2 className="text-lg text-gray-600">Your Balance</h2>
      <div className="space-y-1">
        <div className="text-4xl font-bold text-gray-900">
          {balance}
          <span className="text-lg text-gray-500 ml-2">{currency}</span>
        </div>
      </div>
      <button className="mobile-button">
        Deposit Stablecoin
      </button>
    </div>
  </div>
);

const APYCard = ({ apy = "8.65" }) => (
  <div className="mobile-card">
    <div className="text-center space-y-4">
      <h3 className="text-lg text-gray-600">Current APY</h3>
      <div className="text-5xl font-bold text-yield">
        {apy}%
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Value Locked</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">$1,200.00</div>
      </div>
    </div>
  </div>
);

const FeaturesList = () => (
  <div className="mobile-card space-y-4">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">High APY on Stablecoins</h3>
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-yield flex items-center justify-center mt-0.5">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div>
          <div className="font-medium text-gray-900">No Volatility Risk</div>
          <div className="text-sm text-gray-600">Stable returns on stablecoins</div>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-yield flex items-center justify-center mt-0.5">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div>
          <div className="font-medium text-gray-900">Instant Liquidity</div>
          <div className="text-sm text-gray-600">Withdraw anytime without penalties</div>
        </div>
      </div>
    </div>
  </div>
);

const SecurityCard = () => (
  <div className="mobile-card text-center space-y-4">
    <h3 className="text-xl font-semibold text-gray-900">Security & Trust</h3>
    <div className="w-16 h-16 mx-auto bg-yield rounded-2xl flex items-center justify-center">
      <Shield className="w-8 h-8 text-white" />
    </div>
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-yield rounded-full"></div>
        <span>Audited by AssureAudit™</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-yield rounded-full"></div>
        <span>Increased Coverage</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-yield rounded-full"></div>
        <span>Secure Wallet Integration</span>
      </div>
    </div>
  </div>
);

const EarningsChart = ({ earnings = "2,145.23" }) => (
  <div className="mobile-card">
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        80% Profit - 1 PM
      </div>
      <div className="text-3xl font-bold text-gray-900">
        ${earnings}
      </div>
      <div className="h-32 bg-gradient-to-br from-yield-bg to-white rounded-xl flex items-end justify-center p-4">
        <TrendingUp className="w-20 h-20 text-yield" />
      </div>
    </div>
  </div>
);

const SupportedAssets = () => (
  <div className="mobile-card">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Assets</h3>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-yield-bg px-3 py-2 rounded-lg">
        <div className="w-6 h-6 bg-yield rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">N</span>
        </div>
        <span className="font-medium">NAIA</span>
      </div>
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">U</span>
        </div>
        <span className="font-medium">USDT</span>
      </div>
    </div>
  </div>
);

const TransactionItem = ({ type, amount, time, positive = true }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        positive ? "bg-yield-bg" : "bg-red-50"
      )}>
        {positive ? (
          <ArrowUp className="w-5 h-5 text-yield" />
        ) : (
          <ArrowDown className="w-5 h-5 text-red-500" />
        )}
      </div>
      <div>
        <div className="font-medium text-gray-900">{type}</div>
        <div className="text-sm text-gray-500">{time}</div>
      </div>
    </div>
    <div className={cn(
      "font-semibold",
      positive ? "text-yield" : "text-red-500"
    )}>
      {positive ? "+" : "-"}${amount}
    </div>
  </div>
);

const HistoryTab = () => (
  <div className="mobile-card">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold text-gray-900">History</h3>
      <BarChart3 className="w-6 h-6 text-gray-400" />
    </div>
    
    <div className="space-y-4">
      <div className="h-20 bg-gradient-to-r from-yield-bg to-white rounded-xl flex items-center justify-center">
        <TrendingUp className="w-12 h-12 text-yield" />
      </div>
      
      <div className="space-y-1">
        <TransactionItem 
          type="Deposited"
          amount="50.00"
          time="12% nth"
          positive={true}
        />
        <TransactionItem 
          type="Withdraw"
          amount="00.00"
          time="11% nth"
          positive={false}
        />
      </div>
    </div>
  </div>
);

const NavigationButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200",
      active 
        ? "bg-yield text-white shadow-md" 
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    )}
  >
    {children}
  </button>
);

function LineYieldContent() {
  const { address, isConnected } = useWallet();
  const [activeTab, setActiveTab] = useState('balance');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'balance', label: 'Balance' },
    { id: 'earn', label: 'Earn' },
    { id: 'history', label: 'History' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'balance':
        return (
          <div className="space-y-6">
            <BalanceCard />
            <APYCard />
            <SupportedAssets />
          </div>
        );
      case 'earn':
        return (
          <div className="space-y-6">
            <div className="mobile-card text-center space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Start earning in minutes
              </h2>
              <button className="mobile-button">
                Deposit
              </button>
            </div>
            <EarningsChart />
            <FeaturesList />
            <SecurityCard />
          </div>
        );
      case 'history':
        return (
          <div className="space-y-6">
            <HistoryTab />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 safe-area-top">
        <div className="flex items-center justify-between p-4">
          <LineYieldLogo />
          <div className="flex items-center gap-2">
            {isConnected && (
              <div className="text-sm text-gray-600">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="space-y-3">
              <WalletConnectButton />
              <div className="text-sm text-gray-600 text-center">
                Stablecoin Savings
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <NavigationButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </NavigationButton>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="mobile-container safe-area-bottom">
        {renderTabContent()}
      </main>

      {/* Fixed Bottom CTA for balance tab */}
      {activeTab === 'balance' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom">
          <button className="mobile-button">
            <Wallet className="w-6 h-6 mr-2" />
            Deposit Now
          </button>
        </div>
      )}
    </div>
  );
}

export default function LineYieldApp() {
  return (
    <SimpleWalletProvider>
      <LineYieldContent />
    </SimpleWalletProvider>
  );
}