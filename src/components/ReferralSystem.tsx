import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

// @lovable:referral-system-component

interface ReferralData {
  referralCode: string;
  totalReferrals: number;
  totalEarnings: string;
  pendingEarnings: string;
  referralLink: string;
}

interface Referral {
  id: string;
  address: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
  earnings: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const mockReferrals: Referral[] = [
  {
    id: '1',
    address: '0x1234...5678',
    joinedDate: '2024-01-15',
    status: 'active',
    earnings: '125.50',
    tier: 'gold'
  },
  {
    id: '2',
    address: '0x9876...5432',
    joinedDate: '2024-01-20',
    status: 'active',
    earnings: '89.25',
    tier: 'silver'
  },
  {
    id: '3',
    address: '0x4567...8901',
    joinedDate: '2024-01-25',
    status: 'pending',
    earnings: '0.00',
    tier: 'bronze'
  }
];

export const ReferralSystem: React.FC = () => {
  const [referralData] = useState<ReferralData>({
    referralCode: 'LINE2024',
    totalReferrals: 12,
    totalEarnings: '1,247.50',
    pendingEarnings: '89.25',
    referralLink: 'https://line-yield.com/ref/LINE2024'
  });

  const [copied, setCopied] = useState(false);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-orange-600 bg-orange-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralData.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join LINE Yield',
        text: 'Earn rewards with LINE Yield - the best DeFi platform!',
        url: referralData.referralLink
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Referral System</h2>
        <p className="text-gray-600">Invite friends and earn rewards together</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-blue-600">{referralData.totalReferrals}</p>
            <p className="text-sm text-gray-600">Total Referrals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-green-600">${referralData.totalEarnings}</p>
            <p className="text-sm text-gray-600">Total Earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-yellow-600">${referralData.pendingEarnings}</p>
            <p className="text-sm text-gray-600">Pending Earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-purple-600">5%</p>
            <p className="text-sm text-gray-600">Commission Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-3 bg-gray-50 rounded-lg border">
                <p className="text-sm font-mono text-gray-700">{referralData.referralLink}</p>
              </div>
              <Button 
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button onClick={shareReferral} className="flex-1">
                Share Link
              </Button>
              <Button variant="outline" className="flex-1">
                Generate QR Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referral Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Commission Structure</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Friend's First Deposit</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Friend's Yield Earnings</span>
                  <span className="text-sm font-medium">2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Friend's Trading Fees</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Tier Benefits</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Bronze (1-5 refs)</span>
                  <span className="text-sm font-medium">Base Rate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Silver (6-15 refs)</span>
                  <span className="text-sm font-medium">+10% Bonus</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gold (16-50 refs)</span>
                  <span className="text-sm font-medium">+25% Bonus</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Platinum (50+ refs)</span>
                  <span className="text-sm font-medium">+50% Bonus</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {referral.address.slice(2, 4).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{referral.address}</p>
                    <p className="text-sm text-gray-600">Joined {referral.joinedDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(referral.tier)}`}>
                    {referral.tier.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                    {referral.status.toUpperCase()}
                  </span>
                  <span className="font-medium">${referral.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};