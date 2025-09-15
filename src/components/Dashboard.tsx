import React from 'react';
import { useWallet } from '../providers/SimpleWalletProvider';
import { useYieldData } from '../hooks/useYieldData';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { AnimatedCounter } from './AnimatedCounter';
import { ProgressRing } from './ProgressRing';
import { LoadingSpinner } from './LoadingSpinner';

// @lovable:dashboard-component

export const Dashboard: React.FC = () => {
  const { isConnected } = useWallet();
  const { data, isLoading } = useYieldData();

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Connect your wallet to view dashboard
        </h3>
        <p className="text-gray-600">
          Please connect your wallet to access yield farming features
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Deposited
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $<AnimatedCounter value={parseFloat(data.totalDeposited)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              $<AnimatedCounter value={parseFloat(data.totalEarned)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Current APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              <AnimatedCounter value={parseFloat(data.currentAPY)} suffix="%" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={data.activeStrategies} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <ProgressRing 
                progress={85} 
                size={120} 
                color="#10b981"
                className="mb-4"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Portfolio Health</p>
              <p className="text-lg font-semibold text-green-600">Excellent</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full">
                Deposit USDT
              </Button>
              <Button className="w-full" variant="outline">
                Withdraw Funds
              </Button>
              <Button className="w-full" variant="outline">
                View Strategies
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Deposit</span>
                <span className="text-sm font-medium">+$1,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Yield Earned</span>
                <span className="text-sm font-medium text-green-600">+$25.50</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Strategy Started</span>
                <span className="text-sm font-medium">Compound</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
