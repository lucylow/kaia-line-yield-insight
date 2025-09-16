import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Menu, X, Home, BarChart3, Zap, TrendingUp, Palette, Target, History, CreditCard, Wallet } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onTabChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'realtime', label: 'Real-time', icon: <Zap className="w-5 h-5" /> },
    { id: 'strategies', label: 'Yield', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'nft', label: 'NFT', icon: <Palette className="w-5 h-5" /> },
    { id: 'referral', label: 'Referral', icon: <Target className="w-5 h-5" /> },
    { id: 'transactions', label: 'History', icon: <History className="w-5 h-5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
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
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 touch-manipulation"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-lg font-semibold text-gray-900">LINE Yield</h1>
          </div>
          
          {/* Active tab indicator */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {navigationItems.find(item => item.id === activeTab)?.label}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 touch-manipulation"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 touch-manipulation",
                    activeTab === item.id
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0",
                    activeTab === item.id ? "text-green-600" : "text-gray-500"
                  )}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Menu Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-sm text-gray-500 text-center">
              LINE Yield Platform v1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1">
          {navigationItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 touch-manipulation",
                activeTab === item.id
                  ? "text-green-600 bg-green-50"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <div className="w-5 h-5 mb-1">
                {item.icon}
              </div>
              <span className="text-xs font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeTab,
  onTabChange,
  className
}) => {
  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'realtime', label: 'Real-time', icon: <Zap className="w-5 h-5" /> },
    { id: 'strategies', label: 'Yield Strategies', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'nft', label: 'NFT Marketplace', icon: <Palette className="w-5 h-5" /> },
    { id: 'referral', label: 'Referral', icon: <Target className="w-5 h-5" /> },
    { id: 'transactions', label: 'Transaction History', icon: <History className="w-5 h-5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <aside className={cn(
      "hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-40 bg-white border-r border-gray-200",
      className
    )}>
      <div className="flex flex-col flex-1">
        {/* Sidebar Header */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">LINE Yield</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors duration-200",
                activeTab === item.id
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <div className={cn(
                "flex-shrink-0",
                activeTab === item.id ? "text-green-600" : "text-gray-500"
              )}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500 text-center">
            LINE Yield Platform v1.0.0
          </div>
        </div>
      </div>
    </aside>
  );
};