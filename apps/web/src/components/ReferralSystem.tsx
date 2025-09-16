import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Share2, Copy, QrCode, Trophy, Star, Target, TrendingUp, Users, DollarSign, Gift, Award, Zap, Crown, Medal, Share } from 'lucide-react';

// @lovable:referral-system-component

interface ReferralData {
  referralCode: string;
  totalReferrals: number;
  totalEarnings: string;
  pendingEarnings: string;
  referralLink: string;
  currentTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  tierProgress: number;
  nextTierReferrals: number;
  streakDays: number;
  totalPoints: number;
  monthlyGoal: number;
  monthlyProgress: number;
}

interface Referral {
  id: string;
  address: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
  earnings: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalDeposited: string;
  lastActivity: string;
  points: number;
  isVerified: boolean;
}

const mockReferrals: Referral[] = [
  {
    id: '1',
    address: '0x1234...5678',
    joinedDate: '2024-01-15',
    status: 'active',
    earnings: '125.50',
    tier: 'gold',
    totalDeposited: '2,500',
    lastActivity: '2 hours ago',
    points: 1250,
    isVerified: true
  },
  {
    id: '2',
    address: '0x9876...5432',
    joinedDate: '2024-01-20',
    status: 'active',
    earnings: '89.25',
    tier: 'silver',
    totalDeposited: '1,800',
    lastActivity: '1 day ago',
    points: 890,
    isVerified: true
  },
  {
    id: '3',
    address: '0x4567...8901',
    joinedDate: '2024-01-25',
    status: 'pending',
    earnings: '0.00',
    tier: 'bronze',
    totalDeposited: '0',
    lastActivity: '3 days ago',
    points: 50,
    isVerified: false
  }
];

export const ReferralSystem: React.FC = () => {
  const [referralData] = useState<ReferralData>({
    referralCode: 'LINE2024',
    totalReferrals: 12,
    totalEarnings: '1,247.50',
    pendingEarnings: '89.25',
    referralLink: 'https://line-yield.com/ref/LINE2024',
    currentTier: 'gold',
    tierProgress: 75,
    nextTierReferrals: 3,
    streakDays: 15,
    totalPoints: 1250,
    monthlyGoal: 20,
    monthlyProgress: 12
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Referral System
        </h1>
        <p className="text-lg text-gray-600">Invite friends and earn rewards together</p>
      </div>

      {/* Gamification Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{referralData.currentTier.toUpperCase()} TIER</h3>
              <p className="text-sm text-gray-600">You're doing great! Keep it up!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-gray-900">{referralData.totalPoints} Points</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-600">{referralData.streakDays} day streak</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Tier Progress</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${referralData.tierProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">{referralData.nextTierReferrals} more referrals to next tier</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Monthly Goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(referralData.monthlyProgress / referralData.monthlyGoal) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">{referralData.monthlyProgress}/{referralData.monthlyGoal} referrals this month</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Next Reward</span>
            </div>
            <p className="text-lg font-bold text-purple-600">+50 Points</p>
            <p className="text-xs text-gray-600">Refer 1 more friend</p>
          </div>
        </div>
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

      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-emerald-600" />
            <span>Your Referral Link</span>
          </CardTitle>
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
                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                onClick={shareReferral} 
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <Share className="w-4 h-4 mr-2" />
                Share Link
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
              >
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
              >
                <Gift className="w-4 h-4 mr-2" />
                Rewards
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

      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Your Referrals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {referral.address.slice(2, 4).toUpperCase()}
                      </span>
                    </div>
                    {referral.isVerified && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{referral.address}</p>
                    <p className="text-sm text-gray-600">Joined {referral.joinedDate}</p>
                    <p className="text-xs text-gray-500">Last active: {referral.lastActivity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${referral.earnings}</p>
                    <p className="text-xs text-gray-500">{referral.points} pts</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(referral.tier)}`}>
                    {referral.tier.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                    {referral.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <Users className="w-4 h-4 mr-2" />
              View All Referrals
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};