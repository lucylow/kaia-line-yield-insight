import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Yield Strategies</h2>
        <p className="text-gray-600">Choose from our curated yield farming strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strategy) => (
          <Card key={strategy.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{strategy.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(strategy.risk)}`}>
                  {strategy.risk.toUpperCase()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">APY</p>
                  <p className="text-xl font-bold text-green-600">{strategy.apy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">TVL</p>
                  <p className="text-xl font-bold">{strategy.tvl}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Min Deposit</p>
                  <p className="text-sm font-medium">{strategy.minDeposit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lock Period</p>
                  <p className="text-sm font-medium">{strategy.lockPeriod}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Rewards:</p>
                <div className="flex flex-wrap gap-2">
                  {strategy.rewards.map((reward, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {reward}
                    </span>
                  ))}
                </div>
              </div>

              {selectedStrategy === strategy.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deposit Amount (USDT)
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleDeposit(strategy.id)}
                      className="flex-1"
                    >
                      Deposit
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedStrategy(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className="w-full"
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
