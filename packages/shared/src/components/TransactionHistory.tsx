import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'claim';
  amount: string;
  timestamp: number;
  hash: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
  className?: string;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  className
}) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return '⬇️';
      case 'withdraw':
        return '⬆️';
      case 'claim':
        return '🎁';
      default:
        return '📄';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getTypeIcon(tx.type)}</span>
                  <div>
                    <div className="font-medium capitalize">{tx.type}</div>
                    <div className="text-sm text-gray-600">{formatDate(tx.timestamp)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${tx.amount}</div>
                  <div className={`text-sm ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
