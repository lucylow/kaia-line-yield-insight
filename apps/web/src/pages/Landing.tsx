import React, { useEffect, useState } from 'react';
import { ArrowRight, LineChart, ArrowUp, PlayCircle, Menu, X, Home, TrendingUp, BarChart, ShoppingBag, Users, History, CreditCard, Wallet } from 'lucide-react';
import { WalletConnect } from '../shared/components/WalletConnect';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface LandingProps {
  onNavigate?: (tab: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 backdrop-blur-md bg-white/95 shadow-lg' : 'py-3 md:py-5 bg-white shadow-sm'}`}>
        <div className="container mx-auto px-4 md:px-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3 font-extrabold text-lg md:text-xl lg:text-2xl">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                <LineChart className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                LINE Yield
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-4 xl:gap-6">
              <Link to="/" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <Home className="w-4 h-4" />
                {t('navigation.home')}
              </Link>
              <Link to="/dashboard" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <TrendingUp className="w-4 h-4" />
                {t('navigation.dashboard')}
              </Link>
              <Link to="/analytics" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <BarChart className="w-4 h-4" />
                {t('navigation.analytics')}
              </Link>
              <Link to="/strategies" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <LineChart className="w-4 h-4" />
                {t('navigation.yield')}
              </Link>
              <Link to="/nft" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <ShoppingBag className="w-4 h-4" />
                {t('navigation.nft')}
              </Link>
              <Link to="/referral" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <Users className="w-4 h-4" />
                Referral
              </Link>
              <Link to="/transactions" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <History className="w-4 h-4" />
                History
              </Link>
              <Link to="/payments" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <CreditCard className="w-4 h-4" />
                Payments
              </Link>
              <a href="#features" className="flex items-center gap-1 text-gray-700 font-medium hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
                <span className="w-4 h-4 text-center">✨</span>
                Features
              </a>
            </nav>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex gap-2 lg:gap-4 items-center">
              <LanguageSwitcher />
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg">
                {t('common.signIn')}
              </button>
              <WalletConnect />
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

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md rounded-lg shadow-lg">
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <TrendingUp className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link to="/analytics" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <BarChart className="w-4 h-4" />
                  Analytics
                </Link>
                <Link to="/strategies" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <LineChart className="w-4 h-4" />
                  Yield Strategies
                </Link>
                <Link to="/nft" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <ShoppingBag className="w-4 h-4" />
                  NFT Marketplace
                </Link>
                <Link to="/referral" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <Users className="w-4 h-4" />
                  Referral System
                </Link>
                <Link to="/transactions" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <History className="w-4 h-4" />
                  Transaction History
                </Link>
                <Link to="/payments" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <CreditCard className="w-4 h-4" />
                  Payments
                </Link>
                <a href="#features" className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50">
                  <span className="w-4 h-4 text-center">✨</span>
                  Features
                </a>
                
                <div className="px-4 pt-4 border-t border-gray-200 space-y-3">
                  <LanguageSwitcher variant="buttons" className="w-full" />
                  <button className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg">
                    {t('common.signIn')}
                  </button>
                  <div className="w-full">
                    <WalletConnect />
                  </div>
                </div>
              </nav>
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
                  {t('landing.title')}
                </span>
                <br />
                <span className="text-gray-800">{t('landing.subtitle')}</span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('landing.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-10 justify-center lg:justify-start">
                <button 
                  onClick={handleGetStarted}
                  className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold bg-gradient-to-r from-emerald-400 to-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-lg flex items-center justify-center"
                >
                  {t('landing.getStarted')}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </button>
                <button className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-lg rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  {t('landing.learnMore')}
                </button>
              </div>
              
              {/* Platform Selection */}
              <div className="mb-6 md:mb-10">
                <p className="text-sm md:text-base text-gray-600 mb-4 text-center lg:text-left">Choose your platform:</p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                  <a 
                    href="https://liff.line.me/2008113148-LaMorb83"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-lg md:text-xl mr-2">📱</span>
                    LINE Version
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  </a>
                  <a 
                    href="https://line-yield.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-lg md:text-xl mr-2">🌐</span>
                    WEB Version
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  </a>
                </div>
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
            
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">Your Yield Dashboard</h3>
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1 md:gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>
                
                <div className="text-center mb-4 md:mb-6">
                  <div className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">Total Balance</div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-800 mb-1 md:mb-2">$12,458.90</div>
                  <div className="text-green-600 font-semibold flex items-center justify-center gap-1 bg-green-50 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                    +2.4% ($298.21)
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 p-4 md:p-6 rounded-xl md:rounded-2xl text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="text-xs md:text-sm mb-1 opacity-90">Current APY</div>
                    <div className="text-2xl md:text-3xl font-extrabold">8.64%</div>
                    <div className="text-xs mt-1 opacity-80">Auto-compounded daily</div>
                  </div>
                </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join LINE Yield today and start earning passive income with DeFi strategies.
          </p>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="text-lg px-8 py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-lg flex items-center justify-center"
              >
                Start Earning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">Or choose your preferred platform:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://liff.line.me/2008113148-LaMorb83"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-lg flex items-center justify-center"
                >
                  <span className="text-xl mr-2">📱</span>
                  LINE Version
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="https://line-yield.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-lg flex items-center justify-center"
                >
                  <span className="text-xl mr-2">🌐</span>
                  WEB Version
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;