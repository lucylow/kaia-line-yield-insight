import React, { useState } from 'react';
import { ConnectWalletButton } from '../components/ConnectWalletButton';
import { ConnectWallet } from '../components/ConnectWallet';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Smartphone, 
  Monitor, 
  Zap, 
  Shield, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const WalletDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'buttons' | 'full' | 'features'>('buttons');

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smooth Animations",
      description: "Staggered entrance animations and loading states"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Error Handling",
      description: "Comprehensive error states with user-friendly messages"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Login",
      description: "Google, LINE, Apple, Naver, Kakao integration"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Wallet Detection",
      description: "Automatic detection of installed crypto wallets"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Responsive",
      description: "Optimized for all screen sizes and devices"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Modern Design",
      description: "Clean, professional UI with gradient accents"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Enhanced UI/UX</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connect Wallet
            <span className="block text-3xl text-blue-600 mt-2">Enhanced Experience</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the next generation of wallet connection with smooth animations, 
            intelligent error handling, and beautiful design.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex gap-2">
              {[
                { id: 'buttons', label: 'Button Variants', icon: <Monitor className="w-4 h-4" /> },
                { id: 'full', label: 'Full Component', icon: <Smartphone className="w-4 h-4" /> },
                { id: 'features', label: 'Features', icon: <Star className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDemo(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedDemo === tab.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Content */}
        {selectedDemo === 'buttons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Default Button
                </CardTitle>
                <CardDescription>Primary wallet connection button</CardDescription>
              </CardHeader>
              <CardContent>
                <ConnectWalletButton className="w-full">
                  Connect Wallet
                </ConnectWalletButton>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Outline Button
                </CardTitle>
                <CardDescription>Secondary wallet connection button</CardDescription>
              </CardHeader>
              <CardContent>
                <ConnectWalletButton variant="outline" className="w-full">
                  Connect Wallet
                </ConnectWalletButton>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Ghost Button
                </CardTitle>
                <CardDescription>Subtle wallet connection button</CardDescription>
              </CardHeader>
              <CardContent>
                <ConnectWalletButton variant="ghost" className="w-full">
                  Connect Wallet
                </ConnectWalletButton>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedDemo === 'full' && (
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Complete Wallet Component</CardTitle>
                <CardDescription>
                  Full-featured wallet connection component with all states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConnectWallet />
              </CardContent>
            </Card>
          </div>
        )}

        {selectedDemo === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Enhanced Features Section */}
        <div className="mt-16">
          <Card className="overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-3xl text-gray-900">Enhanced Features</CardTitle>
              <CardDescription className="text-lg">
                Advanced UI/UX improvements for better user experience
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Loading States</h4>
                      <p className="text-sm text-gray-600">
                        Individual loading indicators for each wallet option with smooth animations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Shield className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Error Handling</h4>
                      <p className="text-sm text-gray-600">
                        Comprehensive error states with dismissible error banners
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Wallet Detection</h4>
                      <p className="text-sm text-gray-600">
                        Automatic detection of installed wallets with download links
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Smooth Animations</h4>
                      <p className="text-sm text-gray-600">
                        Staggered entrance animations and hover effects for better visual feedback
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Smartphone className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Mobile Optimized</h4>
                      <p className="text-sm text-gray-600">
                        Responsive design with touch-friendly interactions and proper spacing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Star className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Modern Design</h4>
                      <p className="text-sm text-gray-600">
                        Clean, professional UI with gradient accents and proper visual hierarchy
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to Experience?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click any connect wallet button above to see the enhanced modal in action
                  </p>
                  <div className="flex justify-center gap-4">
                    <ConnectWalletButton size="lg">
                      Try It Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </ConnectWalletButton>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletDemo;
