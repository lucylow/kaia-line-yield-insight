import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  User,
  Bell,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Touch,
  Smartphone,
  Wifi,
  Battery
} from 'lucide-react';

interface MobileStats {
  batteryLevel: number;
  networkType: string;
  isOnline: boolean;
  touchEnabled: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

export const EnhancedMobileExperience: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [mobileStats, setMobileStats] = useState<MobileStats>({
    batteryLevel: 85,
    networkType: '4G',
    isOnline: true,
    touchEnabled: true,
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Simulate mobile stats updates
    const interval = setInterval(() => {
      setMobileStats(prev => ({
        ...prev,
        batteryLevel: Math.max(20, prev.batteryLevel - Math.random() * 2),
        isOnline: navigator.onLine,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: 'deposit',
      title: 'Deposit USDT',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500',
      action: () => console.log('Deposit USDT'),
    },
    {
      id: 'trade',
      title: 'Quick Trade',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-blue-500',
      action: () => console.log('Quick Trade'),
    },
    {
      id: 'rewards',
      title: 'Claim Rewards',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-500',
      action: () => console.log('Claim Rewards'),
    },
    {
      id: 'portfolio',
      title: 'View Portfolio',
      icon: <Home className="w-6 h-6" />,
      color: 'bg-orange-500',
      action: () => console.log('View Portfolio'),
    },
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'trading', label: 'Trading', icon: DollarSign },
    { id: 'portfolio', label: 'Portfolio', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="p-4 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-blue-100">Your portfolio is performing well today</p>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className={`${action.color} text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:scale-105 transition-transform`}
                  >
                    {action.icon}
                    <span className="text-sm font-medium">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Battery</span>
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{mobileStats.batteryLevel.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Network</span>
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{mobileStats.networkType}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Touch</span>
                  <div className="flex items-center space-x-2">
                    <Touch className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            {/* Dashboard content would go here */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-600">Dashboard content for mobile</p>
            </div>
          </div>
        );

      case 'trading':
        return (
          <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Trading</h1>
            {/* Trading content would go here */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-600">Trading interface for mobile</p>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
            {/* Portfolio content would go here */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-600">Portfolio view for mobile</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            {/* Settings content would go here */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-600">Settings for mobile</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">LINE Yield</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}
      </header>

      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-3 p-3 text-gray-700">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-medium">Mobile Optimized</span>
                </div>
                <div className="flex items-center space-x-3 p-3 text-gray-700">
                  <Touch className="w-5 h-5" />
                  <span className="font-medium">Touch Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="flex items-center justify-around py-2">
          {navigationItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Floating Action Button */}
      <button className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20">
        <DollarSign className="w-6 h-6 mx-auto" />
      </button>

      {/* Mobile-specific optimizations */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-scroll {
            -webkit-overflow-scrolling: touch;
          }
          
          .mobile-tap {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedMobileExperience;
