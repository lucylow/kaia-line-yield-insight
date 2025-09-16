import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';

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
    rewards: ['USDT', 'LINE Points']
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
    rewards: ['KAI', 'USDT', 'LINE Points']
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
    rewards: ['NFT Tokens', 'USDT', 'LINE Points']
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
    rewards: ['USDT', 'Bridge Tokens']
  }
];

export const YieldStrategies: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleDeposit = (strategyId: string) => {
    if (!depositAmount) {
      alert('Please enter a deposit amount');
      return;
    }
    alert(`Depositing $${depositAmount} into strategy ${strategyId}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Yield Strategies
        </h1>
        <p className="text-lg text-gray-600">Choose from our curated yield farming strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {strategies.map((strategy) => (
          <Card key={strategy.id} className="relative bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">{strategy.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{strategy.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(strategy.risk)} shadow-sm`}>
                  {strategy.risk.toUpperCase()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-6">
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
                    >
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
                <Button 
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Select Strategy
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
