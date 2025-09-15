import React from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle,
  ConnectWallet,
  BalanceDisplay,
  TransactionHistory,
  useLineYield 
} from '@shared';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { vaultData, deposit, withdraw, isLoading, isDepositing, isWithdrawing } = useLineYield();

  const handleDeposit = async () => {
    try {
      await deposit('100');
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw('50');
    } catch (error) {
      console.error('Withdrawal failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your portfolio performance and manage your investments</p>
      </div>

      {/* Wallet Connection */}
      <div className="mb-8">
        <ConnectWallet />
      </div>

      {vaultData ? (
        <div className="space-y-8">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BalanceDisplay 
              balance={vaultData.userAssets}
              earned={vaultData.earnedYield}
              apy={vaultData.apy}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleDeposit}
                  loading={isDepositing}
                  className="w-full"
                >
                  Deposit $100
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleWithdraw}
                  loading={isWithdrawing}
                  className="w-full"
                >
                  Withdraw $50
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">${vaultData.userAssets}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Earned Yield</p>
                    <p className="text-2xl font-bold text-gray-900">${vaultData.earnedYield}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Current APY</p>
                    <p className="text-2xl font-bold text-gray-900">{vaultData.apy}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingDown className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">TVL</p>
                    <p className="text-2xl font-bold text-gray-900">${vaultData.totalValueLocked}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <TransactionHistory transactions={vaultData.transactions} />
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Portfolio Data</h3>
          <p className="text-gray-600 mb-6">Connect your wallet to view your portfolio and start earning yield.</p>
          <ConnectWallet />
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading portfolio data...</p>
        </div>
      )}
    </div>
  );
};
