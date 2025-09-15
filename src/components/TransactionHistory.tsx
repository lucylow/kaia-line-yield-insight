import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'yield' | 'referral' | 'swap' | 'loan';
  amount: string;
  token: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  hash: string;
  description: string;
  fee?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: '1000.00',
    token: 'USDT',
    status: 'completed',
    timestamp: '2024-01-25 14:30:22',
    hash: '0x1234...5678',
    description: 'Deposit to USDT Stable Pool',
    fee: '2.50'
  },
  {
    id: '2',
    type: 'yield',
    amount: '25.50',
    token: 'USDT',
    status: 'completed',
    timestamp: '2024-01-24 09:15:33',
    hash: '0x9876...5432',
    description: 'Yield earned from USDT Stable Pool'
  },
  {
    id: '3',
    type: 'referral',
    amount: '12.75',
    token: 'USDT',
    status: 'completed',
    timestamp: '2024-01-23 16:45:12',
    hash: '0x4567...8901',
    description: 'Referral commission from friend deposit'
  },
  {
    id: '4',
    type: 'withdraw',
    amount: '500.00',
    token: 'USDT',
    status: 'pending',
    timestamp: '2024-01-22 11:20:45',
    hash: '0x2345...6789',
    description: 'Withdrawal from Kaia Liquidity Mining',
    fee: '5.00'
  },
  {
    id: '5',
    type: 'swap',
    amount: '100.00',
    token: 'KAI',
    status: 'completed',
    timestamp: '2024-01-21 08:30:15',
    hash: '0x3456...7890',
    description: 'Swap KAI to USDT',
    fee: '0.50'
  },
  {
    id: '6',
    type: 'loan',
    amount: '750.00',
    token: 'USDT',
    status: 'completed',
    timestamp: '2024-01-20 13:15:28',
    hash: '0x5678...9012',
    description: 'Loan against NFT collateral',
    fee: '15.00'
  }
];

export const TransactionHistory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw' | 'yield' | 'referral' | 'swap' | 'loan'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'text-green-600 bg-green-100';
      case 'withdraw': return 'text-red-600 bg-red-100';
      case 'yield': return 'text-blue-600 bg-blue-100';
      case 'referral': return 'text-purple-600 bg-purple-100';
      case 'swap': return 'text-yellow-600 bg-yellow-100';
      case 'loan': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'yield':
      case 'referral':
        return 'text-green-600';
      case 'withdraw':
      case 'loan':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAmountPrefix = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'yield':
      case 'referral':
        return '+';
      case 'withdraw':
      case 'loan':
        return '-';
      default:
        return '';
    }
  };

  const filteredTransactions = filter === 'all' 
    ? mockTransactions 
    : mockTransactions.filter(tx => tx.type === filter);

  const totalVolume = mockTransactions.reduce((sum, tx) => {
    const amount = parseFloat(tx.amount);
    return tx.type === 'deposit' || tx.type === 'yield' || tx.type === 'referral' 
      ? sum + amount 
      : sum - amount;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction History</h2>
        <p className="text-gray-600">Track all your transactions and earnings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-blue-600">{mockTransactions.length}</p>
            <p className="text-sm text-gray-600">Total Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-green-600">${totalVolume.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Net Volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-purple-600">$38.25</p>
            <p className="text-sm text-gray-600">Total Fees</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {['all', 'deposit', 'withdraw', 'yield', 'referral', 'swap', 'loan'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === type
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {transaction.type.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                    {transaction.type.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status.toUpperCase()}
                  </span>
                  <span className={`font-medium ${getAmountColor(transaction.type)}`}>
                    {getAmountPrefix(transaction.type)}${transaction.amount} {transaction.token}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedTransaction && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Transaction Details</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedTransaction(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium">{selectedTransaction.type.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium">{getAmountPrefix(selectedTransaction.type)}${selectedTransaction.amount} {selectedTransaction.token}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium">{selectedTransaction.status.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Timestamp</p>
                  <p className="font-medium">{selectedTransaction.timestamp}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Transaction Hash</p>
                  <p className="font-mono text-sm">{selectedTransaction.hash}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium">{selectedTransaction.description}</p>
                </div>
                {selectedTransaction.fee && (
                  <div>
                    <p className="text-sm text-gray-600">Fee</p>
                    <p className="font-medium">${selectedTransaction.fee}</p>
                  </div>
                )}
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(`https://explorer.kaia.one/tx/${selectedTransaction.hash}`, '_blank')}
                  >
                    View on Explorer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};