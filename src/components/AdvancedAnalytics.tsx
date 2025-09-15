import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface AnalyticsData {
  portfolio: {
    totalValue: number;
    totalReturn: number;
    dailyChange: number;
    weeklyChange: number;
    monthlyChange: number;
    yearlyChange: number;
    sharpeRatio: number;
    maxDrawdown: number;
    volatility: number;
  };
  performance: {
    date: string;
    value: number;
    return: number;
  }[];
  allocation: {
    asset: string;
    value: number;
    percentage: number;
    change: number;
  }[];
  trades: {
    date: string;
    type: 'buy' | 'sell' | 'swap';
    pair: string;
    amount: number;
    price: number;
    pnl: number;
  }[];
  riskMetrics: {
    var95: number;
    var99: number;
    expectedShortfall: number;
    beta: number;
    correlation: number;
  };
}

export const AdvancedAnalytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'1d' | '7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'allocation' | 'trades' | 'risk'>('overview');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        portfolio: {
          totalValue: 25000,
          totalReturn: 12.5,
          dailyChange: 2.3,
          weeklyChange: 8.7,
          monthlyChange: 15.2,
          yearlyChange: 45.8,
          sharpeRatio: 1.85,
          maxDrawdown: -8.2,
          volatility: 12.4,
        },
        performance: generatePerformanceData(timeRange),
        allocation: [
          { asset: 'USDT/KAIA', value: 12500, percentage: 50, change: 2.5 },
          { asset: 'USDT/BTC', value: 7500, percentage: 30, change: -1.2 },
          { asset: 'USDT/ETH', value: 5000, percentage: 20, change: 3.8 },
        ],
        trades: generateTradesData(),
        riskMetrics: {
          var95: 2.1,
          var99: 3.8,
          expectedShortfall: 4.2,
          beta: 0.85,
          correlation: 0.72,
        },
      };
      
      setData(mockData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePerformanceData = (range: string) => {
    const days = range === '1d' ? 1 : range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    const data = [];
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: 25000 + Math.random() * 5000 - 2500,
        return: Math.random() * 10 - 5,
      });
    }
    
    return data;
  };

  const generateTradesData = () => {
    const trades = [];
    const pairs = ['USDT/KAIA', 'USDT/BTC', 'USDT/ETH'];
    const types = ['buy', 'sell', 'swap'] as const;
    
    for (let i = 0; i < 20; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      trades.push({
        date: date.toISOString().split('T')[0],
        type: types[Math.floor(Math.random() * types.length)],
        pair: pairs[Math.floor(Math.random() * pairs.length)],
        amount: Math.random() * 1000 + 100,
        price: Math.random() * 100 + 10,
        pnl: Math.random() * 200 - 100,
      });
    }
    
    return trades.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getChangeColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (value: number) => {
    return value >= 0 ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading analytics...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load analytics data</p>
        <Button onClick={loadAnalyticsData} className="mt-4">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive portfolio analysis and risk metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <Button onClick={loadAnalyticsData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['1d', '7d', '30d', '90d', '1y'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'performance'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <LineChart className="w-4 h-4 inline mr-2" />
          Performance
        </button>
        <button
          onClick={() => setActiveTab('allocation')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'allocation'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <PieChart className="w-4 h-4 inline mr-2" />
          Allocation
        </button>
        <button
          onClick={() => setActiveTab('trades')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'trades'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Activity className="w-4 h-4 inline mr-2" />
          Trades
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'risk'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target className="w-4 h-4 inline mr-2" />
          Risk
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Portfolio Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(data.portfolio.totalValue)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Return</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getChangeColor(data.portfolio.totalReturn)}`}>
                  {formatPercentage(data.portfolio.totalReturn)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Sharpe Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {data.portfolio.sharpeRatio.toFixed(2)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Max Drawdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getChangeColor(data.portfolio.maxDrawdown)}`}>
                  {formatPercentage(data.portfolio.maxDrawdown)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  {getChangeIcon(data.portfolio.dailyChange)}
                  <span className="ml-2">Daily</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${getChangeColor(data.portfolio.dailyChange)}`}>
                  {formatPercentage(data.portfolio.dailyChange)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  {getChangeIcon(data.portfolio.weeklyChange)}
                  <span className="ml-2">Weekly</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${getChangeColor(data.portfolio.weeklyChange)}`}>
                  {formatPercentage(data.portfolio.weeklyChange)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  {getChangeIcon(data.portfolio.monthlyChange)}
                  <span className="ml-2">Monthly</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${getChangeColor(data.portfolio.monthlyChange)}`}>
                  {formatPercentage(data.portfolio.monthlyChange)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  {getChangeIcon(data.portfolio.yearlyChange)}
                  <span className="ml-2">Yearly</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${getChangeColor(data.portfolio.yearlyChange)}`}>
                  {formatPercentage(data.portfolio.yearlyChange)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Performance Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Performance chart would be rendered here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Data points: {data.performance.length} over {timeRange}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Allocation Tab */}
      {activeTab === 'allocation' && (
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.allocation.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {asset.asset.split('/')[0].slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{asset.asset}</p>
                        <p className="text-sm text-gray-600">{asset.percentage}% allocation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(asset.value)}</p>
                      <div className={`flex items-center text-sm ${getChangeColor(asset.change)}`}>
                        {getChangeIcon(asset.change)}
                        <span className="ml-1">{formatPercentage(asset.change)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trades Tab */}
      {activeTab === 'trades' && (
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Pair</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.trades.slice(0, 10).map((trade, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">{trade.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            trade.type === 'buy' ? 'bg-green-100 text-green-800' :
                            trade.type === 'sell' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {trade.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{trade.pair}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{trade.amount.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(trade.price)}</td>
                        <td className={`py-3 px-4 text-sm font-medium ${getChangeColor(trade.pnl)}`}>
                          {formatCurrency(trade.pnl)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Risk Tab */}
      {activeTab === 'risk' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">VaR (95%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatPercentage(-data.riskMetrics.var95)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Daily Value at Risk</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">VaR (99%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatPercentage(-data.riskMetrics.var99)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Daily Value at Risk</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Expected Shortfall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatPercentage(-data.riskMetrics.expectedShortfall)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Conditional VaR</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Beta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {data.riskMetrics.beta.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Market sensitivity</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {data.riskMetrics.correlation.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Market correlation</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Volatility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatPercentage(data.portfolio.volatility)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Annual volatility</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;
