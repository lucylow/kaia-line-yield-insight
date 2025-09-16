import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle,
  ConnectWallet,
  usePlatform 
} from '@shared';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  Globe,
  Smartphone,
  BarChart3,
  Wallet,
  Star
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isWeb } = usePlatform();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">LY</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LINE Yield
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The ultimate DeFi platform integrated with LINE ecosystem on Kaia blockchain. 
              Earn yield, trade NFTs, and grow your portfolio with cutting-edge DeFi strategies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-lg px-8 py-4">
                <Link to="/dashboard" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link to="/strategies">Explore Strategies</Link>
              </Button>
            </div>

            {/* Wallet Connection */}
            <div className="max-w-md mx-auto">
              <ConnectWallet />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose LINE Yield?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of DeFi with our comprehensive platform designed for both beginners and experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">High Yield Farming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Earn up to 15% APY with our carefully curated yield farming strategies across multiple protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Secure & Audited</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All smart contracts are audited by leading security firms and protected by insurance protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Gasless Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Enjoy gasless transactions on LINE LIFF while maintaining full control on web platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Social Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with friends, share strategies, and earn rewards through our referral system.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track your portfolio performance with real-time analytics and detailed reporting.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Multi-Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access from LINE LIFF mobile app or web browser with seamless cross-platform experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of users already earning with LINE Yield
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$2.4M</div>
              <div className="text-blue-100">Total Value Locked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">8.5%</div>
              <div className="text-blue-100">Average APY</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1,247</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15</div>
              <div className="text-blue-100">Yield Strategies</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Connect Wallet</h3>
              <p className="text-gray-600">
                Connect your MetaMask wallet or LINE account to get started with secure, encrypted access.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Choose Strategy</h3>
              <p className="text-gray-600">
                Select from our curated yield farming strategies with different risk levels and returns.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Earn Rewards</h3>
              <p className="text-gray-600">
                Watch your portfolio grow with automatic compounding and real-time yield tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join LINE Yield today and start earning passive income with DeFi strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              <Link to="/dashboard" className="flex items-center">
                Start Earning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Link to="/strategies">View All Strategies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">LY</span>
                </div>
                <h3 className="text-xl font-bold">LINE Yield</h3>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate DeFi platform integrated with LINE ecosystem on Kaia blockchain.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/strategies" className="hover:text-white">Yield Farming</Link></li>
                <li><Link to="/nft" className="hover:text-white">NFT Marketplace</Link></li>
                <li><Link to="/referral" className="hover:text-white">Referral Program</Link></li>
                <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-white">Security Audit</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Telegram</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2024 LINE Yield Platform. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
