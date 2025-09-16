import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, Target, Zap, Shield, Clock, RefreshCw, Settings, Eye, EyeOff } from 'lucide-react';

const Trading: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'swap' | 'portfolio' | 'orders' | 'analytics'>('swap');
  const [showPrivateData, setShowPrivateData] = useState(true);
  const [portfolioData] = useState({
    totalValue: 25000,
    totalReturn: 12.5,
    dailyChange: 2.3,
    weeklyChange: 8.7,
    monthlyChange: 15.2,
    positions: [
      { symbol: 'USDT/KAIA', amount: 10000, value: 12300, change: 2.5, apy: 8.5 },
      { symbol: 'USDT/BTC', amount: 5000, value: 7500, change: -1.2, apy: 6.2 },
      { symbol: 'USDT/ETH', amount: 8000, value: 5200, change: 3.8, apy: 7.8 },
    ]
  });

  const [tradingStats] = useState({
    totalVolume: 125000,
    totalTrades: 1250,
    successRate: 98.5,
    avgSlippage: 0.3,
    totalFees: 375,
    rewardsEarned: 1875,
  });

  const [recentTrades] = useState([
    { id: 1, pair: 'USDT/KAIA', type: 'Buy', amount: 1000, price: 1.23, time: '2m ago', status: 'completed' },
    { id: 2, pair: 'USDT/BTC', type: 'Sell', amount: 500, price: 1.50, time: '15m ago', status: 'completed' },
    { id: 3, pair: 'USDT/ETH', type: 'Buy', amount: 800, price: 0.65, time: '1h ago', status: 'pending' },
  ]);

  const handleSwap = async () => {
    try {
      console.log('Executing token swap...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Swap completed successfully!');
    } catch (error) {
      console.error('Swap failed:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      console.log('Placing advanced order...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Order placed successfully!');
    } catch (error) {
      console.error('Order placement failed:', error);
    }
  };

  const handleRefreshPortfolio = () => {
    console.log('Refreshing portfolio data...');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Trading & Portfolio
        </h1>
        <p className="text-lg text-gray-600">Advanced trading tools and portfolio management</p>
      </div>

      {/* Trading Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
              Total Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${tradingStats.totalVolume.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">24h trading volume</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-blue-600" />
              Total Trades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {tradingStats.totalTrades.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">Completed trades</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Target className="w-4 h-4 mr-2 text-green-600" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {tradingStats.successRate}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Trade success rate</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-purple-600" />
              Rewards Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${tradingStats.rewardsEarned.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">Trading rewards</div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Tabs */}
      <div className="flex space-x-1 bg-gradient-to-r from-emerald-50 to-green-50 p-1 rounded-xl border border-emerald-200">
        {[
          { id: 'swap', label: 'Token Swap', icon: RefreshCw },
          { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
          { id: 'orders', label: 'Orders', icon: Clock },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-white text-emerald-700 shadow-lg'
                : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'swap' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-emerald-600" />
                <span>Token Swap</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option>USDT</option>
                      <option>KAIA</option>
                      <option>ETH</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option>KAIA</option>
                      <option>USDT</option>
                      <option>ETH</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-medium">1 USDT = 0.81 KAIA</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Slippage:</span>
                    <span className="font-medium">0.3%</span>
                  </div>
                </div>
                <Button 
                  onClick={handleSwap}
                  className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Swap Tokens
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Advanced Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Target className="w-4 h-4 mr-2" />
                    Limit Order
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                    <Clock className="w-4 h-4 mr-2" />
                    Stop Loss
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option>Market Order</option>
                      <option>Limit Order</option>
                      <option>Stop Loss</option>
                      <option>Take Profit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      placeholder="0.0"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Portfolio Overview</CardTitle>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowPrivateData(!showPrivateData)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPrivateData ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={handleRefreshPortfolio}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {showPrivateData ? `$${portfolioData.totalValue.toLocaleString()}` : '••••••'}
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Total Return</p>
                  <p className="text-2xl font-bold text-green-600">+{portfolioData.totalReturn}%</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-white to-orange-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Daily Change</p>
                  <p className="text-2xl font-bold text-green-600">+{portfolioData.dailyChange}%</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Positions</h4>
                {portfolioData.positions.map((position, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-emerald-600">
                          {position.symbol.split('/')[1].slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{position.symbol}</p>
                        <p className="text-sm text-gray-600">{position.apy}% APY</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {showPrivateData ? `$${position.value.toLocaleString()}` : '••••••'}
                      </p>
                      <p className={`text-sm ${position.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.change >= 0 ? '+' : ''}{position.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'orders' && (
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center space-x-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>Recent Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      trade.type === 'Buy' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {trade.type === 'Buy' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{trade.pair}</p>
                      <p className="text-sm text-gray-600">{trade.type} • {trade.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{trade.amount} {trade.pair.split('/')[0]}</p>
                    <p className="text-sm text-gray-600">@ ${trade.price}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trade.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-white text-orange-700'
                    }`}>
                      {trade.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <span>Trading Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">{tradingStats.successRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Slippage</span>
                  <span className="font-semibold text-gray-900">{tradingStats.avgSlippage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Fees Paid</span>
                  <span className="font-semibold text-gray-900">${tradingStats.totalFees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rewards Earned</span>
                  <span className="font-semibold text-purple-600">${tradingStats.rewardsEarned}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Market Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Best Performing</p>
                  <p className="text-lg font-bold text-blue-600">USDT/ETH</p>
                  <p className="text-sm text-green-600">+3.8% today</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Highest Volume</p>
                  <p className="text-lg font-bold text-emerald-600">USDT/KAIA</p>
                  <p className="text-sm text-gray-600">$45.2K volume</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Trading;
