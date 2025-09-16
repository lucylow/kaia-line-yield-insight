import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useWallet } from '../providers/SimpleWalletProvider';

const Profile: React.FC = () => {
  const { address, balanceFormatted, symbol } = useWallet();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          User Profile
        </h1>
        <p className="text-lg text-gray-600">Manage your account and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Wallet Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Wallet Address</label>
              <p className="text-sm text-gray-900 font-mono">{address || 'Not connected'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Balance</label>
              <p className="text-sm text-gray-900">{balanceFormatted} {symbol}</p>
            </div>
            <Button variant="outline" className="w-full">
              Export Wallet
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Email Notifications</label>
              <p className="text-sm text-gray-500">Receive updates about your investments</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Security</label>
              <p className="text-sm text-gray-500">Manage your security preferences</p>
            </div>
            <Button variant="outline" className="w-full">
              Update Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;