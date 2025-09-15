import React from 'react';
import { Button, Card, CardHeader, CardContent, CardTitle } from '@shared';
import { Users, Gift, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const ReferralSystem: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'LY2024ABC123';
  const referralLink = `https://line-yield.com/ref/${referralCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const stats = [
    { label: 'Total Referrals', value: '12', icon: Users },
    { label: 'Total Rewards', value: '45.2 KAI', icon: Gift },
    { label: 'Active Referrals', value: '8', icon: Users },
    { label: 'Pending Rewards', value: '12.8 KAI', icon: Gift }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral System</h1>
        <p className="text-gray-600">Invite friends and earn rewards together</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Referral Code */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Referral Code</p>
              <p className="text-lg font-mono font-bold">{referralCode}</p>
            </div>
            <Button onClick={handleCopyLink} variant="outline">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Referral Link</p>
            <div className="flex items-center space-x-4">
              <div className="flex-1 p-3 bg-gray-50 rounded-lg text-sm font-mono break-all">
                {referralLink}
              </div>
              <Button onClick={handleCopyLink} variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Share Your Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Share your referral code with friends through social media, messaging apps, or direct sharing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Friends Join
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              When your friends sign up using your code, they become your referrals and you both earn rewards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Earn Together
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Earn 5% of your referrals' yield farming rewards and 10% of their trading fees.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Reward Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Activity</th>
                  <th className="text-left py-3 px-4">Your Reward</th>
                  <th className="text-left py-3 px-4">Friend's Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Sign Up</td>
                  <td className="py-3 px-4">5 KAI</td>
                  <td className="py-3 px-4">10 KAI</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">First Deposit</td>
                  <td className="py-3 px-4">2% of deposit</td>
                  <td className="py-3 px-4">5% bonus APY</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Yield Farming</td>
                  <td className="py-3 px-4">5% of their yield</td>
                  <td className="py-3 px-4">Standard APY</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Trading</td>
                  <td className="py-3 px-4">10% of their fees</td>
                  <td className="py-3 px-4">Reduced fees</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
