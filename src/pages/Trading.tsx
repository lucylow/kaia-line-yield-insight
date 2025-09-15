import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Trading: React.FC = () => {
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

export default Trading;
