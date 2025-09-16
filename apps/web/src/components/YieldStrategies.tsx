import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Shield, Clock, DollarSign, BarChart3, Filter, SortAsc, Star, Zap, Target, AlertTriangle } from 'lucide-react';

// @lovable:yield-strategies-component

interface Strategy {
  id: string;
  name: string;
  apy: string;
  tvl: string;
  risk: 'low' | 'medium' | 'high';
  description: string;
  minDeposit: string;
  lockPeriod: string;
  rewards: string[];
  performance: {
    dailyChange: number;
    weeklyChange: number;
    monthlyChange: number;
  };
  features: string[];
  isRecommended: boolean;
  isActive: boolean;
  userDeposited?: number;
}

const strategies: Strategy[] = [
  {
    id: '1',
    name: 'USDT Stable Pool',
    apy: '8.5%',
    tvl: '$2.4M',
    risk: 'low',
    description: 'Low-risk stablecoin yield farming with USDT',
    minDeposit: '$100',
    lockPeriod: '7 days',
    rewards: ['USDT', 'LINE Points'],
    performance: { dailyChange: 0.2, weeklyChange: 1.4, monthlyChange: 6.1 },
    features: ['Auto-compound', 'Instant withdrawal', 'Insurance coverage'],
    isRecommended: true,
    isActive: true,
    userDeposited: 1000
  },
  {
    id: '2',
    name: 'Kaia Liquidity Mining',
    apy: '12.3%',
    tvl: '$1.8M',
    risk: 'medium',
    description: 'Provide liquidity for Kaia ecosystem tokens',
    minDeposit: '$500',
    lockPeriod: '30 days',
    rewards: ['KAI', 'USDT', 'LINE Points'],
    performance: { dailyChange: 0.8, weeklyChange: 5.2, monthlyChange: 22.1 },
    features: ['Impermanent loss protection', 'Multi-token rewards', 'Flexible staking'],
    isRecommended: false,
    isActive: true,
    userDeposited: 0
  },
  {
    id: '3',
    name: 'NFT Collateral Pool',
    apy: '15.7%',
    tvl: '$890K',
    risk: 'high',
    description: 'High-yield pool using NFT collateral',
    minDeposit: '$1000',
    lockPeriod: '90 days',
    rewards: ['NFT Tokens', 'USDT', 'LINE Points'],
    performance: { dailyChange: 1.2, weeklyChange: 8.4, monthlyChange: 35.7 },
    features: ['NFT-backed', 'High yield', 'Exclusive rewards'],
    isRecommended: false,
    isActive: true,
    userDeposited: 0
  },
  {
    id: '4',
    name: 'Cross-Chain Bridge',
    apy: '6.2%',
    tvl: '$3.1M',
    risk: 'low',
    description: 'Earn rewards by providing bridge liquidity',
    minDeposit: '$200',
    lockPeriod: '14 days',
    rewards: ['USDT', 'Bridge Tokens'],
    performance: { dailyChange: 0.1, weeklyChange: 0.7, monthlyChange: 3.0 },
    features: ['Cross-chain', 'Low risk', 'Stable returns'],
    isRecommended: true,
    isActive: false,
    userDeposited: 0
  }
];

export const YieldStrategies: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [sortBy, setSortBy] = useState<'apy' | 'tvl' | 'risk' | 'performance'>('apy');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleDeposit = async (strategyId: string) => {
    if (!depositAmount) {
      // Show proper error notification instead of alert
      console.error('Please enter a deposit amount');
      return;
    }
    
    try {
      // In a real implementation, this would call the backend API
      console.log(`Initiating deposit of $${depositAmount} into strategy ${strategyId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and show success
      setDepositAmount('');
      setSelectedStrategy(null);
      console.log('Deposit successful!');
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  // Filter and sort strategies
  const filteredStrategies = strategies
    .filter(strategy => {
      if (filterRisk !== 'all' && strategy.risk !== filterRisk) return false;
      if (showOnlyActive && !strategy.isActive) return false;
      if (showOnlyRecommended && !strategy.isRecommended) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'apy':
          return parseFloat(b.apy) - parseFloat(a.apy);
        case 'tvl':
          return parseFloat(b.tvl.replace(/[$,]/g, '')) - parseFloat(a.tvl.replace(/[$,]/g, ''));
        case 'risk':
          const riskOrder = { low: 1, medium: 2, high: 3 };
          return riskOrder[a.risk] - riskOrder[b.risk];
        case 'performance':
          return b.performance.monthlyChange - a.performance.monthlyChange;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Yield Strategies
        </h1>
        <p className="text-lg text-gray-600">Choose from our curated yield farming strategies</p>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as any)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOnlyActive}
                onChange={(e) => setShowOnlyActive(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">Active Only</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOnlyRecommended}
                onChange={(e) => setShowOnlyRecommended(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">Recommended</span>
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="apy">APY</option>
              <option value="tvl">TVL</option>
              <option value="risk">Risk Level</option>
              <option value="performance">Performance</option>
            </select>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <SortAsc className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2' : 'space-y-4'} gap-8`}>
        {filteredStrategies.map((strategy) => (
          <Card key={strategy.id} className={`relative bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${!strategy.isActive ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-xl font-bold">{strategy.name}</CardTitle>
                    {strategy.isRecommended && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                    {!strategy.isActive && (
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {strategy.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(strategy.risk)} shadow-sm`}>
                    {strategy.risk.toUpperCase()}
                  </span>
                  {strategy.userDeposited && strategy.userDeposited > 0 && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Deposited: ${strategy.userDeposited}
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">APY</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{strategy.apy}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">TVL</p>
                  <p className="text-2xl font-bold text-gray-900">{strategy.tvl}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Min Deposit</p>
                  <p className="text-sm font-semibold text-gray-800">{strategy.minDeposit}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Lock Period</p>
                  <p className="text-sm font-semibold text-gray-800">{strategy.lockPeriod}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3 font-medium">Performance:</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      {strategy.performance.dailyChange >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className="text-xs text-gray-600">Daily</span>
                    </div>
                    <p className={`text-sm font-semibold ${strategy.performance.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {strategy.performance.dailyChange >= 0 ? '+' : ''}{strategy.performance.dailyChange}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      {strategy.performance.weeklyChange >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className="text-xs text-gray-600">Weekly</span>
                    </div>
                    <p className={`text-sm font-semibold ${strategy.performance.weeklyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {strategy.performance.weeklyChange >= 0 ? '+' : ''}{strategy.performance.weeklyChange}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      {strategy.performance.monthlyChange >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className="text-xs text-gray-600">Monthly</span>
                    </div>
                    <p className={`text-sm font-semibold ${strategy.performance.monthlyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {strategy.performance.monthlyChange >= 0 ? '+' : ''}{strategy.performance.monthlyChange}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3 font-medium">Rewards:</p>
                <div className="flex flex-wrap gap-2">
                  {strategy.rewards.map((reward, index) => (
                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 text-xs rounded-full font-medium shadow-sm">
                      {reward}
                    </span>
                  ))}
                </div>
              </div>

              {selectedStrategy === strategy.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deposit Amount (USDT)
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => handleDeposit(strategy.id)}
                      className="flex-1 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      disabled={!strategy.isActive}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Deposit
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedStrategy(null)}
                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button 
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    disabled={!strategy.isActive}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    {strategy.isActive ? 'Select Strategy' : 'Strategy Inactive'}
                  </Button>
                  {strategy.userDeposited && strategy.userDeposited > 0 && (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                      >
                        Manage
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
                      >
                        Withdraw
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
