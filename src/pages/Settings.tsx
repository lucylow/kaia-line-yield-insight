import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Settings
        </h1>
        <p className="text-lg text-gray-600">Configure your LINE Yield experience</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Language</label>
              <p className="text-sm text-gray-500">English</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Theme</label>
              <p className="text-sm text-gray-500">Light Mode</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Currency</label>
              <p className="text-sm text-gray-500">USD</p>
            </div>
            <Button variant="outline" className="w-full">
              Update Preferences
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Two-Factor Authentication</label>
              <p className="text-sm text-gray-500">Disabled</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Session Timeout</label>
              <p className="text-sm text-gray-500">30 minutes</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">API Access</label>
              <p className="text-sm text-gray-500">Limited</p>
            </div>
            <Button variant="outline" className="w-full">
              Update Security
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;