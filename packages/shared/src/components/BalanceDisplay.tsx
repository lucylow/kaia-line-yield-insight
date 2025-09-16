import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

export interface BalanceDisplayProps {
  balance: string;
  earned: string;
  apy?: string;
  className?: string;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance,
  earned,
  apy,
  className
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Your Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Assets</span>
          <span className="text-xl font-bold">${balance}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Earned Yield</span>
          <span className="text-lg font-semibold text-green-600">+${earned}</span>
        </div>
        {apy && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current APY</span>
            <span className="text-lg font-semibold text-blue-600">{apy}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
