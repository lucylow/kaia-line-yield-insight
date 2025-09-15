import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const TradingOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Trading & Earn
        </h1>
        <p className="text-lg text-gray-600">Trade tokens and earn rewards</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Token Swap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Swap between different tokens</p>
            <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Start Swap
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Trading Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Earn rewards for trading activities</p>
            <Button className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300" variant="outline">
              View Rewards
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Swap: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Token Swap
        </h1>
        <p className="text-lg text-gray-600">Exchange tokens instantly</p>
      </div>
      
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Swap Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">From</label>
            <div className="flex space-x-2">
              <input 
                type="number" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="0.00"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option>USDT</option>
                <option>ETH</option>
                <option>KLAY</option>
              </select>
            </div>
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="sm" className="rounded-full">
              ↓
            </Button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">To</label>
            <div className="flex space-x-2">
              <input 
                type="number" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="0.00"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option>ETH</option>
                <option>USDT</option>
                <option>KLAY</option>
              </select>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Exchange Rate</span>
              <span className="font-bold">1 USDT = 0.0004 ETH</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Slippage</span>
              <span className="font-bold">0.5%</span>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            Swap Tokens
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Portfolio
        </h1>
        <p className="text-lg text-gray-600">Track your trading portfolio</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">$12,450</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">+$1,250</div>
              <div className="text-sm text-gray-600">24h Change</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">+15.2%</div>
              <div className="text-sm text-gray-600">Total Return</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">8</div>
              <div className="text-sm text-gray-600">Assets</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'USDT', value: '$5,000', percentage: '40%', color: 'bg-emerald-500' },
              { name: 'ETH', value: '$3,750', percentage: '30%', color: 'bg-blue-500' },
              { name: 'KLAY', value: '$2,500', percentage: '20%', color: 'bg-purple-500' },
              { name: 'Others', value: '$1,200', percentage: '10%', color: 'bg-gray-500' },
            ].map((asset, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${asset.color}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{asset.name}</span>
                    <span className="font-bold">{asset.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${asset.color}`}
                      style={{ width: asset.percentage }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{asset.percentage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TradingHistory: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Trading History
        </h1>
        <p className="text-lg text-gray-600">View your trading activity</p>
      </div>
      
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Trades</CardTitle>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-01-15', type: 'Buy', pair: 'USDT/ETH', amount: '100 USDT', price: '0.0004 ETH', status: 'Completed' },
                  { date: '2024-01-14', type: 'Sell', pair: 'ETH/USDT', amount: '0.5 ETH', price: '2,500 USDT', status: 'Completed' },
                  { date: '2024-01-13', type: 'Buy', pair: 'KLAY/USDT', amount: '500 KLAY', price: '0.25 USDT', status: 'Completed' },
                ].map((trade, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm">{trade.date}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        trade.type === 'Buy' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">{trade.pair}</td>
                    <td className="py-3 px-4 text-sm">{trade.amount}</td>
                    <td className="py-3 px-4 text-sm">{trade.price}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TradingRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<TradingOverview />} />
      <Route path="swap" element={<Swap />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="history" element={<TradingHistory />} />
    </Routes>
  );
};
