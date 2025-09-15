import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@shared';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsDashboard: React.FC = () => {
  const portfolioData = [
    { month: 'Jan', value: 1000 },
    { month: 'Feb', value: 1200 },
    { month: 'Mar', value: 1100 },
    { month: 'Apr', value: 1400 },
    { month: 'May', value: 1600 },
    { month: 'Jun', value: 1800 }
  ];

  const yieldData = [
    { strategy: 'Conservative', apy: 6.5, users: 450 },
    { strategy: 'Balanced', apy: 8.2, users: 320 },
    { strategy: 'High Yield', apy: 12.8, users: 180 },
    { strategy: 'Premium', apy: 15.2, users: 95 }
  ];

  const pieData = [
    { name: 'Conservative', value: 45, color: '#10B981' },
    { name: 'Balanced', value: 30, color: '#3B82F6' },
    { name: 'High Yield', value: 20, color: '#8B5CF6' },
    { name: 'Premium', value: 5, color: '#F59E0B' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive analytics and market insights</p>
      </div>

      {/* Portfolio Performance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strategy Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Strategy Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Yield Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Yield Strategy Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strategy" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="apy" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">$2.4M</p>
              <p className="text-sm text-gray-600">Total Value Locked</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">8.5%</p>
              <p className="text-sm text-gray-600">Average APY</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-600">Yield Strategies</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
