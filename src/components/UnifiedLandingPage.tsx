import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LineChart, ArrowUp, PlayCircle, Menu, X, Home, TrendingUp, Users, Award, ShoppingBag, History, CreditCard, BarChart, Wallet, User, Settings, HelpCircle } from 'lucide-react';
import { ConnectWallet } from './ConnectWallet';
import { useWallet } from '../hooks/useWallet';

export const UnifiedLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
    { name: 'Analytics', href: '/dashboard', icon: BarChart },
    { name: 'Yield Strategies', href: '/dashboard', icon: TrendingUp },
    { name: 'NFT Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Referral', href: '/referral', icon: Users },
    { name: 'History', href: '/history', icon: History },
    { name: 'Payments', href: '/dashboard', icon: CreditCard },
    { name: 'Trading', href: '/dashboard', icon: BarChart },
    { name: 'Wallet Demo', href: '/dashboard', icon: Wallet },
  ];

  const handleGetStarted = () => {
    if (isConnected) {
      navigate('/dashboard');
    } else {
      document.getElementById('connect-wallet')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header with Beautiful Navigation */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 backdrop-blur-md bg-white/95 shadow-lg' : 'py-3 md:py-5 bg-white shadow-sm'
      }`}>
        <div className="container mx-auto px-4 md:px-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 md:gap-3 font-extrabold text-lg md:text-xl lg:text-2xl">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">LY</span>
              </div>
              <span className="bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                LINE Yield
              </span>
            </Link>
            
            {/* Desktop Connect Wallet */}
            <div className="hidden md:flex gap-2 lg:gap-4 items-center">
              <button className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 px-4 py-2 rounded-lg">
                Connect Wallet
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu - Beautiful Grid */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md rounded-lg shadow-lg">
              <nav className="grid grid-cols-2 gap-3 mb-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex flex-col items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-4 rounded-lg hover:bg-green-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs text-center">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              
              {/* Connect Wallet Message */}
              <div className="px-4 py-3 bg-green-50 rounded-lg border border-green-200 text-center">
                <p className="text-sm text-green-700 font-medium mb-2">
                  {isConnected ? "Connected to wallet" : "Connect your wallet to view dashboard"}
                </p>
                <p className="text-xs text-green-600">
                  {isConnected ? "Ready to explore yield farming features" : "Please connect your wallet to access yield farming features"}
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-5">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6 border border-green-200 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Powered by Kaia Blockchain</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-800 via-green-600 to-emerald-500 bg-clip-text text-transparent">
                  Earn Automated Yield on Your USDT
                </span>
                <br />
                <span className="text-gray-800">While You Chat</span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                LINE Yield lets you maximize your stablecoin earnings through automated DeFi strategies, 
                directly within LINE Messenger. Set it and forget it.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-10 justify-center lg:justify-start">
                <button 
                  onClick={handleGetStarted}
                  className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold bg-gradient-to-r from-emerald-400 to-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-lg flex items-center justify-center"
                >
                  Start Earning Now
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </button>
                <button className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-lg rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 max-w-sm md:max-w-md mx-auto lg:mx-0">
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-extrabold text-green-800 mb-1 md:mb-2">8.64%</div>
                  <div className="text-xs md:text-sm text-gray-600">Average APY</div>
                </div>
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-extrabold text-green-800 mb-1 md:mb-2">$12.4M</div>
                  <div className="text-xs md:text-sm text-gray-600">Total Value Locked</div>
                </div>
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-extrabold text-green-800 mb-1 md:mb-2">24/7</div>
                  <div className="text-xs md:text-sm text-gray-600">Auto-Rebalancing</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0" id="connect-wallet">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">Your Yield Dashboard</h3>
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1 md:gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>
                
                <ConnectWallet />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-5">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-green-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">Why Choose LINE Yield</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4 md:mb-5">Maximize Your Earnings with Zero Effort</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines the power of DeFi with the convenience of LINE Messenger
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/20">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-green-600 text-lg md:text-2xl">
                📈
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">High Yield Returns</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Earn up to 8.64% APY on your USDT through automated DeFi strategies optimized for maximum returns.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/20">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-green-600 text-lg md:text-2xl">
                🔒
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">Secure & Audited</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                All smart contracts are audited by leading security firms and protected by insurance protocols.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/20">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-green-600 text-lg md:text-2xl">
                ⚡
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">Instant Access</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Start earning immediately through LINE Messenger with gasless transactions and instant deposits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Product Links */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="container mx-auto px-4 md:px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">Yield Farming</Link></li>
                <li><Link to="/marketplace" className="text-gray-600 hover:text-green-600 transition-colors">NFT Marketplace</Link></li>
                <li><Link to="/referral" className="text-gray-600 hover:text-green-600 transition-colors">Referral Program</Link></li>
                <li><Link to="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">Payment System</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Smart Contracts</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Security Audit</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Discord</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Telegram</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-600 hover:text-green-600 transition-colors">Help Center</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Bug Reports</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Feature Requests</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">© 2024 LINE Yield Platform. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="text-gray-600 hover:text-green-600 transition-colors text-sm">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-600 hover:text-green-600 transition-colors text-sm">Terms of Service</Link>
                <a href="#" className="text-gray-600 hover:text-green-600 transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};