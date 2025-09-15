import React, { useState } from 'react';
import { EnhancedTradingInterface } from '../components/EnhancedTradingInterface';
import { RealTimeNotifications } from '../components/RealTimeNotifications';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  Zap,
  Target,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const EnhancedTrading: React.FC = () => {
  const [activeView, setActiveView] = useState<'trading' | 'portfolio' | 'analytics'>('trading');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tradingStats = {
    totalVolume: '125,000',
    totalTrades: '1,250',
    successRate: '98.5',
    avgSlippage: '0.3',
    totalFees: '375',
    rewardsEarned: '1,875',
  };

  const portfolioData = {
    totalValue: '25,000',
    totalReturn: '12.5',
    dailyChange: '2.3',
    weeklyChange: '8.7',
    monthlyChange: '15.2',
    positions: [
      { symbol: 'USDT/KAIA', amount: '10,000', value: '12,300', change: '2.5' },
      { symbol: 'USDT/BTC', amount: '5,000', value: '7,500', change: '-1.2' },
      { symbol: 'USDT/ETH', amount: '8,000', value: '5,200', change: '3.8' },
    ],
  };

  const analyticsData = {
    tradingVolume: [
      { date: '2024-01-01', volume: 10000 },
      { date: '2024-01-02', volume: 15000 },
      { date: '2024-01-03', volume: 12000 },
      { date: '2024-01-04', volume: 18000 },
      { date: '2024-01-05', volume: 20000 },
    ],
    topPairs: [
      { pair: 'USDT/KAIA', volume: '45,000', trades: '450' },
      { pair: 'USDT/BTC', volume: '32,000', trades: '320' },
      { pair: 'USDT/ETH', volume: '28,000', trades: '280' },
    ],
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold text-gray-900">Enhanced Trading</h1>
            <div className="flex items-center space-x-2">
              <RealTimeNotifications />
            </div>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="p-4">
          <EnhancedTradingInterface />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Enhanced Trading</h1>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Live</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <RealTimeNotifications />
              <Button variant="outline" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveView('trading')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeView === 'trading'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Trading
          </button>
          <button
            onClick={() => setActiveView('portfolio')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeView === 'portfolio'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <DollarSign className="w-4 h-4 inline mr-2" />
            Portfolio
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeView === 'analytics'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
        </div>

        {/* Trading View */}
        {activeView === 'trading' && (
          <div className="space-y-8">
            {/* Trading Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                    Total Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    ${tradingStats.totalVolume}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-blue-600" />
                    Total Trades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {tradingStats.totalTrades}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-purple-600" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {tradingStats.successRate}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    Avg Slippage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {tradingStats.avgSlippage}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-red-600" />
                    Total Fees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    ${tradingStats.totalFees}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                    Rewards Earned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    ${tradingStats.rewardsEarned}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Interface */}
            <EnhancedTradingInterface />
          </div>
        )}

        {/* Portfolio View */}
        {activeView === 'portfolio' && (
          <div className="space-y-8">
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    ${portfolioData.totalValue}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    +{portfolioData.totalReturn}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Daily Change</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    +{portfolioData.dailyChange}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Weekly Change</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    +{portfolioData.weeklyChange}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Positions */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Current Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.positions.map((position, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {position.symbol.split('/')[0].slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{position.symbol}</p>
                          <p className="text-sm text-gray-600">Amount: {position.amount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${position.value}</p>
                        <div className={`flex items-center text-sm ${
                          parseFloat(position.change) >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {parseFloat(position.change) >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {position.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <div className="space-y-8">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Trading Volume (7d)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    ${analyticsData.tradingVolume.reduce((sum, day) => sum + day.volume, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Avg Daily Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    ${(analyticsData.tradingVolume.reduce((sum, day) => sum + day.volume, 0) / analyticsData.tradingVolume.length).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {analyticsData.topPairs.reduce((sum, pair) => sum + parseInt(pair.trades), 0)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Trading Pairs */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Top Trading Pairs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topPairs.map((pair, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {pair.pair.split('/')[0].slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{pair.pair}</p>
                          <p className="text-sm text-gray-600">{pair.trades} trades</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${pair.volume}</p>
                        <p className="text-sm text-gray-600">Volume</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnhancedTrading;
