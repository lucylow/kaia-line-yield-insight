import React, { useState, useEffect } from 'react';
import { useWallet } from '../providers/SimpleWalletProvider';
import { useYieldData } from '../hooks/useYieldData';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { AnimatedCounter } from './AnimatedCounter';
import { ProgressRing } from './ProgressRing';
import { LoadingSpinner } from './LoadingSpinner';
import { TrendingUp, TrendingDown, RefreshCw, Activity } from 'lucide-react';

// @lovable:dashboard-component

export const Dashboard: React.FC = () => {
  const { isConnected } = useWallet();
  const { data, isLoading } = useYieldData();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [performanceData, setPerformanceData] = useState({
    dailyChange: 2.5,
    weeklyChange: 8.3,
    monthlyChange: 15.7,
    totalReturn: 12.4,
  });

  useEffect(() => {
    // Update last update time every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Connect your wallet to view dashboard
        </h3>
        <p className="text-gray-600">
          Please connect your wallet to access yield farming features
        </p>
      </div>
    );
  }

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
      <div className="text-center mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">Monitor your yield farming performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Activity className="w-4 h-4" />
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={() => setLastUpdate(new Date())}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
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
              $<AnimatedCounter value={parseFloat(data.totalDeposited)} />
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
              $<AnimatedCounter value={parseFloat(data.totalEarned)} />
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
              <AnimatedCounter value={parseFloat(data.currentAPY)} suffix="%" />
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
              <AnimatedCounter value={data.activeStrategies} />
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
            <CardTitle className="text-xl font-bold">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <ProgressRing 
                progress={85} 
                size={120} 
                color="#10b981"
                className="mb-4"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Portfolio Health</p>
              <p className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Excellent</p>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Deposit USDT
              </Button>
              <Button className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300" variant="outline">
                Withdraw Funds
              </Button>
              <Button className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300" variant="outline">
                View Strategies
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">Deposit</span>
                <span className="text-sm font-bold text-emerald-600">+$1,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">Yield Earned</span>
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">+$25.50</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-medium text-gray-700">Strategy Started</span>
                <span className="text-sm font-bold text-gray-900">Compound</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
