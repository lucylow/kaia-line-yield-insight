import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import WalletConnectButton from '../components/WalletConnectButton.jsx';
import { WalletIntegrationExample } from '../components/WalletIntegrationExample';
import { Wallet, Shield, Zap, Users } from 'lucide-react';

const WalletConnectDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Wallet Connection Demo</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience seamless wallet connection with support for multiple wallet types including social logins and crypto wallets.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Secure Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect securely with your preferred wallet using industry-standard encryption and authentication.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Fast & Easy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Quick connection process with support for social logins and popular crypto wallets.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Multi-Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Support for LINE, Google, Apple, Naver, Kakao, OKX Wallet, and Bitget Wallet.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Connection Demo */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Try Wallet Connection</CardTitle>
            <p className="text-gray-600">
              Click the button below to open the wallet connection modal and see all available options.
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="flex justify-center">
              <WalletConnectButton 
                variant="default" 
                size="lg"
                className="px-8 py-3 text-lg"
              />
            </div>
            
            <div className="text-sm text-gray-500 space-y-2">
              <p>✨ Supports multiple wallet types</p>
              <p>🔐 Secure authentication</p>
              <p>📱 Mobile-friendly interface</p>
            </div>
          </CardContent>
        </Card>

        {/* Supported Wallets */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Supported Wallet Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-600">Social Login Wallets</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    Google
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    LINE
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
                    Apple
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    Naver
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    Kakao
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-600">Crypto Wallets</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    Kaia Wallet
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    OKX Wallet
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    Bitget Wallet
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Example */}
        <WalletIntegrationExample />
      </div>
    </div>
  );
};

export default WalletConnectDemo;
