import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { YieldStrategies } from '../../components/YieldStrategies';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const YieldStrategiesOverview: React.FC = () => {
  return <YieldStrategies />;
};

const CreateStrategy: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Create Yield Strategy
        </h1>
        <p className="text-lg text-gray-600">Set up a new yield farming strategy</p>
      </div>
      
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Strategy Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Strategy Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter strategy name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Initial Investment</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Risk Level</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option>Conservative</option>
              <option>Moderate</option>
              <option>Aggressive</option>
            </select>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            Create Strategy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const ManageStrategies: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Manage Strategies
        </h1>
        <p className="text-lg text-gray-600">Monitor and adjust your yield strategies</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Strategy {i}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">APY</span>
                <span className="text-sm font-bold text-emerald-600">12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">TVL</span>
                <span className="text-sm font-bold">$1,250</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Stop
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const StrategyAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Strategy Analytics
        </h1>
        <p className="text-lg text-gray-600">Detailed performance metrics for your strategies</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">$5,250</div>
              <div className="text-sm text-gray-600">Total Value Locked</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">15.2%</div>
              <div className="text-sm text-gray-600">Average APY</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">$125</div>
              <div className="text-sm text-gray-600">Total Earned</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">3</div>
              <div className="text-sm text-gray-600">Active Strategies</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const YieldStrategiesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<YieldStrategiesOverview />} />
      <Route path="create" element={<CreateStrategy />} />
      <Route path="manage" element={<ManageStrategies />} />
      <Route path="analytics" element={<StrategyAnalytics />} />
    </Routes>
  );
};
