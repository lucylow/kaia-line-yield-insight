import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';

// @lovable:dashboard-component

export function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">LINE Yield Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$0.00</p>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current APY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0.00%</p>
            <p className="text-sm text-muted-foreground">Annual Percentage Yield</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rewards Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$0.00</p>
            <p className="text-sm text-muted-foreground">Total Rewards</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
