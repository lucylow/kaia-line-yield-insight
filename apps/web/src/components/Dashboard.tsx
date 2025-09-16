import React, { useState, useEffect } from 'react';
import { useWallet } from '../providers/SimpleWalletProvider';
import { useYieldData } from '../hooks/useYieldData';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AnimatedCounter } from './AnimatedCounter';
import { ProgressRing } from './ProgressRing';
import { LoadingSpinner } from './LoadingSpinner';
import { TrendingUp, TrendingDown, RefreshCw, Activity, Eye, EyeOff, Settings, Download, Share2, Bell, Target, Zap } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { isConnected } = useWallet();
  const { data, isLoading } = useYieldData();
  
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showPrivateData, setShowPrivateData] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '7D' | '30D' | '90D'>('7D');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New yield opportunity available', type: 'info', time: '2m ago' },
    { id: 2, message: 'Portfolio rebalancing completed', type: 'success', time: '1h ago' },
    { id: 3, message: 'Market volatility detected', type: 'warning', time: '3h ago' }
  ]);
  const [performanceData, setPerformanceData] = useState({
    dailyChange: 2.5,
    weeklyChange: 8.3,
    monthlyChange: 15.7,
    totalReturn: 12.4,
  });
  const [portfolioAllocation, setPortfolioAllocation] = useState([
    { name: 'USDT Stable Pool', percentage: 45, value: 4500, color: '#10b981' },
    { name: 'Kaia Liquidity Mining', percentage: 30, value: 3000, color: '#3b82f6' },
    { name: 'NFT Collateral Pool', percentage: 20, value: 2000, color: '#8b5cf6' },
    { name: 'Cross-Chain Bridge', percentage: 5, value: 500, color: '#f59e0b' }
  ]);

  useEffect(() => {
    // Update last update time every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLastUpdate(new Date());
    // In a real app, this would refresh data from the API
    console.log('Refreshing dashboard data...');
  };

  const handleExportData = () => {
    console.log('Exporting dashboard data...');
  };

  const handleShareDashboard = () => {
    console.log('Sharing dashboard...');
  };

  const handleSettings = () => {
    console.log('Opening dashboard settings...');
  };

  // Wallet connection is now optional - show demo data when not connected
  const demoData = !isConnected ? {
    totalDeposited: '0',
    totalEarned: '0',
    currentAPY: '8.5',
    activeStrategies: 0
  } : data;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">Monitor your yield farming performance</p>
            {!isConnected && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 Connect your wallet to see your actual data and start earning yield
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <button
                onClick={() => setShowPrivateData(!showPrivateData)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title={showPrivateData ? 'Hide private data' : 'Show private data'}
              >
                {showPrivateData ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button 
                onClick={handleSettings}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors" 
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button 
                onClick={handleExportData}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors" 
                title="Export data"
              >
                <Download className="w-4 h-4" />
              </button>
              <button 
                onClick={handleShareDashboard}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors" 
                title="Share dashboard"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            {(['1D', '7D', '30D', '90D'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Bell className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Recent Updates</span>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-sm text-gray-700">{notification.message}</span>
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Deposited
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              $<AnimatedCounter value={parseFloat(demoData.totalDeposited)} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              $<AnimatedCounter value={parseFloat(demoData.totalEarned)} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Current APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <AnimatedCounter value={parseFloat(demoData.currentAPY)} suffix="%" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              <AnimatedCounter value={demoData.activeStrategies} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
              Daily Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +<AnimatedCounter value={performanceData.dailyChange} suffix="%" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
              Weekly Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              +<AnimatedCounter value={performanceData.weeklyChange} suffix="%" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
              Monthly Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              +<AnimatedCounter value={performanceData.monthlyChange} suffix="%" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-orange-600" />
              Total Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              +<AnimatedCounter value={performanceData.totalReturn} suffix="%" />
            </div>
          </CardContent>
        </Card>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Portfolio Allocation</CardTitle>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-gray-600">Auto-Rebalancing</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {portfolioAllocation.map((allocation, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{allocation.name}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {showPrivateData ? `$${allocation.value.toLocaleString()}` : '••••••'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${allocation.percentage}%`,
                        backgroundColor: allocation.color
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{allocation.percentage}%</span>
                    <span>{allocation.percentage > 0 ? '+' : ''}{allocation.percentage * 0.1}% today</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <Zap className="w-4 h-4 mr-2" />
                Auto-Rebalance
              </Button>
              <Button className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300" variant="outline">
                View Strategies
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              <Button variant="outline" size="sm" className="text-xs">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Deposit</span>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-600">+$1,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Yield Earned</span>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">+$25.50</span>
              </div>
              <div className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Strategy Started</span>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900">Compound</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                View Transaction History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};