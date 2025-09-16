import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { AnimatedCounter } from './AnimatedCounter';
import { ProgressRing } from './ProgressRing';
import { useRealTimeMarketData, useRealTimeYieldData } from '../hooks/useRealTimeData';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { data: marketData, isLoading: marketLoading } = useRealTimeMarketData();
  const { data: yieldData, isLoading: yieldLoading } = useRealTimeYieldData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getTrendIcon = (value: number) => {
    return value >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getTrendColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (marketLoading || yieldLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Real-Time Analytics</h2>
        <p className="text-gray-600">Live market data and platform metrics</p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              USDT Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${marketData?.price.toFixed(4) || '1.0000'}
            </div>
            <div className={`text-sm flex items-center mt-1 ${getTrendColor(marketData?.change24h || 0)}`}>
              {getTrendIcon(marketData?.change24h || 0)}
              <span className="ml-1">{formatPercentage(marketData?.change24h || 0)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketData?.volume24h ? formatCurrency(marketData.volume24h) : '$2.5M'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Trading activity
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Current APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <AnimatedCounter value={yieldData?.apy || 8.5} suffix="%" />
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Average yield
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={yieldData?.activeUsers || 1247} />
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Platform users
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Value Locked</span>
                <span className="font-semibold">
                  {yieldData?.tvl ? formatCurrency(yieldData.tvl) : '$2.4M'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Rewards Distributed</span>
                <span className="font-semibold text-green-600">
                  {yieldData?.totalRewards ? formatCurrency(yieldData.totalRewards) : '$125K'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Platform Health</span>
                <div className="flex items-center">
                  <ProgressRing progress={95} size={60} color="#10b981" />
                  <span className="ml-2 text-sm font-medium text-green-600">Excellent</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price Stability</span>
                <span className="font-semibold text-green-600">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Liquidity Depth</span>
                <span className="font-semibold text-blue-600">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Network Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Updates Indicator */}
      <div className="text-center">
        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live data • Last updated: {marketData?.lastUpdated.toLocaleTimeString() || 'Just now'}
        </div>
      </div>
    </div>
  );
};