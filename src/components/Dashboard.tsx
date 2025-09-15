import React from 'react';
import { useWallet } from '../providers/WalletProvider';
import { useYieldData } from '../hooks/useYieldData';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

export const Dashboard: React.FC = () => {
  const { wallet } = useWallet();
  const { data, isLoading } = useYieldData();

  if (!wallet.isConnected) {
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading dashboard...</p>
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
            <div className="text-2xl font-bold">${data.totalDeposited}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${data.totalEarned}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Current APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{data.currentAPY}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeStrategies}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">
              Deposit USDT
            </Button>
            <Button className="w-full" variant="outline">
              Withdraw Funds
            </Button>
            <Button className="w-full" variant="outline">
              View Strategies
            </Button>
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
