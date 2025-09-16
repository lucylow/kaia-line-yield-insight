import React, { useState } from 'react';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface ReferralPromotionProps {
  userAddress?: string | null;
}

export const ReferralPromotion: React.FC<ReferralPromotionProps> = ({ userAddress }) => {
  const [copied, setCopied] = useState(false);
  
  // Generate referral code from user address
  const referralCode = userAddress ? `LY-${userAddress.slice(-8).toUpperCase()}` : 'LY-XXXXXXXX';
  const referralLink = `https://lineyield.app/ref/${referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOnSocial = (platform: string) => {
    const text = `Join me on LINE Yield and start earning yield on your USDT! Use my referral code: ${referralCode}`;
    const url = referralLink;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="space-y-6">
      {/* Referral Code Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">🎁</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Referral Code
            </h2>
            <p className="text-gray-600">
              Share this code with friends to earn rewards together
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Your Referral Code</div>
              <div className="text-2xl font-bold text-gray-900 mb-4 font-mono">
                {referralCode}
              </div>
              <div className="text-sm text-gray-500 mb-2">Referral Link</div>
              <div className="text-sm text-blue-600 break-all mb-4">
                {referralLink}
              </div>
              <Button
                onClick={copyToClipboard}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:shadow-lg transition-all duration-300"
              >
                {copied ? '✓ Copied!' : '📋 Copy Link'}
              </Button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Share on Social Media
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => shareOnSocial('twitter')}
                  className="flex items-center justify-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <span>🐦</span>
                  <span>Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareOnSocial('facebook')}
                  className="flex items-center justify-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <span>📘</span>
                  <span>Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareOnSocial('telegram')}
                  className="flex items-center justify-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <span>✈️</span>
                  <span>Telegram</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareOnSocial('whatsapp')}
                  className="flex items-center justify-center space-x-2 border-green-200 text-green-600 hover:bg-green-50"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Rewards Information */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            💰 Referral Rewards
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-lg font-bold text-green-600">100 Points</div>
              <div className="text-sm text-gray-600">When friend signs up</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-lg font-bold text-blue-600">50 Points</div>
              <div className="text-sm text-gray-600">First deposit bonus</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-lg font-bold text-purple-600">10%</div>
              <div className="text-sm text-gray-600">Ongoing yield share</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              Earn rewards every time your referred friends make transactions and earn yield!
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-white border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Your Referral Stats
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Total Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Active Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
