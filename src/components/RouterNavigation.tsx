import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/Button';
import { MenuIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';
import WalletConnectButton from './WalletConnectButton';
import { useWallet } from '../providers/SimpleWalletProvider';
import { routeConfig } from '../router/routes';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface RouterNavigationProps {
  className?: string;
}

export const RouterNavigation: React.FC<RouterNavigationProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, address, balanceFormatted, symbol, disconnect } = useWallet();

  // Convert route config to navigation items
  const navigationItems: NavigationItem[] = routeConfig.protected.map(route => ({
    id: route.path.split('/').pop() || 'dashboard',
    label: route.label,
    icon: route.icon,
    path: route.path,
  }));

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/app/strategies')) return 'strategies';
    if (path.startsWith('/app/nft')) return 'nft';
    if (path.startsWith('/app/trading')) return 'trading';
    if (path.startsWith('/app/')) {
      const segment = path.split('/')[2];
      return segment;
    }
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className={cn(
        "lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200",
        className
      )}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 touch-manipulation"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">LINE Yield</h1>
          </div>
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <span className="text-sm text-gray-600">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            ) : (
              <WalletConnectButton />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-80 bg-white shadow-xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
              <button
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="space-y-1 px-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.path)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 touch-manipulation",
                      activeTab === item.id
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
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
                <WalletConnectButton />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navigationItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.path)}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-md text-xs font-medium transition-colors duration-200',
                activeTab === item.id
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center justify-center p-2 rounded-md text-xs font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
          >
            <MenuIcon className="h-6 w-6" />
            <span>More</span>
          </button>
        </div>
      </div>
    </>
  );
};

export const DesktopSidebar: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, address, balanceFormatted, symbol, disconnect } = useWallet();

  const navigationItems: NavigationItem[] = routeConfig.protected.map(route => ({
    id: route.path.split('/').pop() || 'dashboard',
    label: route.label,
    icon: route.icon,
    path: route.path,
  }));

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/app/strategies')) return 'strategies';
    if (path.startsWith('/app/nft')) return 'nft';
    if (path.startsWith('/app/trading')) return 'trading';
    if (path.startsWith('/app/')) {
      const segment = path.split('/')[2];
      return segment;
    }
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (path: string) => {
    navigate(path);
  };

  return (
    <aside className={cn(
      "hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-40 bg-white border-r border-gray-200",
      className
    )}>
      <div className="flex flex-col flex-1">
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg mr-3">
            <span className="text-white font-bold text-lg">LY</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
            LINE Yield
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.path)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors duration-200",
                activeTab === item.id
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="px-4 py-4 border-t border-gray-200">
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
            <WalletConnectButton />
          )}
        </div>
      </div>
    </aside>
  );
};
