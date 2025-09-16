import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { MenuIcon, X, Home, BarChart, TrendingUp, Leaf, Palette, Target, History, CreditCard, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';
import WalletConnectButton from './WalletConnectButton';
import { useWallet } from '../providers/SimpleWalletProvider';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

export const SimpleNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, address, balanceFormatted, symbol, disconnect } = useWallet();

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart, path: '/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, path: '/analytics' },
    { id: 'strategies', label: 'Yield Strategies', icon: Leaf, path: '/strategies' },
    { id: 'nft', label: 'NFT Marketplace', icon: Palette, path: '/nft' },
    { id: 'referral', label: 'Referral', icon: Target, path: '/referral' },
    { id: 'transactions', label: 'History', icon: History, path: '/transactions' },
    { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payments' },
    { id: 'trading', label: 'Trading', icon: TrendingUp, path: '/trading' },
    { id: 'wallet-demo', label: 'Wallet Demo', icon: Wallet, path: '/wallet-demo' },
  ];

  const getActiveTab = () => {
    const path = location.pathname;
    const segment = path.split('/')[1];
    return segment || 'home';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LY</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
              LINE Yield
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <WalletConnectButton size="sm" />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <MenuIcon className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">LY</span>
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
                          LINE Yield
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="p-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <nav className="flex-1 p-4">
                    <div className="space-y-2">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleTabChange(item.path)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors",
                              isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "text-gray-700 hover:bg-gray-50"
                            )}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </nav>
                  
                  <div className="p-4 border-t border-gray-200">
                    {isConnected ? (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          <p>Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
                          <p>Balance: {balanceFormatted} {symbol}</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={disconnect}
                          className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
                        >
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <WalletConnectButton className="w-full" />
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">LY</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
                LINE Yield
              </span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                      isActive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            {isConnected ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p>Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
                  <p>Balance: {balanceFormatted} {symbol}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={disconnect}
                  className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <WalletConnectButton className="w-full" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors",
                  isActive
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
