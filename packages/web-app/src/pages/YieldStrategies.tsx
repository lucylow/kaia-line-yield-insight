import React from 'react';
import { Button, Card, CardHeader, CardContent, CardTitle } from '@shared';
import { TrendingUp, Shield, Zap, Star } from 'lucide-react';

export const YieldStrategies: React.FC = () => {
  const strategies = [
    {
      id: 1,
      name: 'Conservative Yield',
      apy: '6.5%',
      risk: 'Low',
      description: 'Stable returns with minimal risk through established protocols',
      icon: Shield,
      color: 'green'
    },
    {
      id: 2,
      name: 'Balanced Growth',
      apy: '8.2%',
      risk: 'Medium',
      description: 'Balanced approach with moderate risk and good returns',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      id: 3,
      name: 'High Yield',
      apy: '12.8%',
      risk: 'High',
      description: 'Maximum returns with higher risk through innovative strategies',
      icon: Zap,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Premium Strategy',
      apy: '15.2%',
      risk: 'Very High',
      description: 'Exclusive strategy for experienced users with maximum potential',
      icon: Star,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Yield Strategies</h1>
        <p className="text-gray-600">Choose from our curated yield farming strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          return (
            <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(strategy.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{strategy.apy}</div>
                    <div className="text-sm text-gray-600">APY</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{strategy.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{strategy.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Risk Level:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    strategy.risk === 'Low' ? 'bg-green-100 text-green-800' :
                    strategy.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    strategy.risk === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {strategy.risk}
                  </span>
                </div>
                <Button className="w-full">
                  Select Strategy
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
