import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, TransactionHistory } from '@shared';
import { useLineYield } from '@shared';

export const TransactionHistoryPage: React.FC = () => {
  const { vaultData } = useLineYield();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
        <p className="text-gray-600">View all your transaction history and activity</p>
      </div>

      {vaultData ? (
        <TransactionHistory transactions={vaultData.transactions} />
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">No transaction history available. Connect your wallet to view transactions.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
