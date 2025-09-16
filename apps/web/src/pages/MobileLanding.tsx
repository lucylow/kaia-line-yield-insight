import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Bot, Shield, TrendingUp, LineChart, ArrowUp, ArrowDown, PlayCircle, FileText, Menu, X, Star, Users, Clock, DollarSign } from 'lucide-react';
import { Button } from '../components/simple/Button';
import { useWallet } from '../hooks/useWallet';
import Chatbot from '../components/Chatbot';
import { ConnectWallet } from '../components/ConnectWallet';

const MobileLanding: React.FC = () => {
  const { isConnected, connect } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = async () => {
    if (!isConnected) {
      connect();
    }
    alert('Welcome to LINE Yield! Dashboard functionality will be implemented here.');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden safe-area-top safe-area-bottom">
      {/* Mobile Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 backdrop-blur-md bg-white/95 shadow-lg' : 'py-3 bg-white shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="#" className="flex items-center gap-2 font-extrabold text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                <LineChart className="w-4 h-4" />
              </div>
              <span className="bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                LINE Yield
              </span>
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
              aria-label="Toggle mobile menu"
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
            <div className="mt-4 py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md rounded-lg shadow-lg">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#" 
                  className="text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50 touch-target"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#features" 
                  className="text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50 touch-target"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50 touch-target"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </a>
                <a 
                  href="#" 
                  className="text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50 touch-target"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="#" 
                  className="text-gray-700 font-medium hover:text-green-600 transition-colors px-4 py-3 rounded-lg hover:bg-green-50 touch-target"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Docs
                </a>
                <div className="px-4 pt-4 border-t border-gray-200 space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 touch-target"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Sign In
                  </Button>
                  <ConnectWallet className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 touch-target" />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce-in border border-green-200 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Powered by Kaia Blockchain</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight animate-slide-in-left">
              <span className="bg-gradient-to-r from-green-800 via-green-600 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">
                Earn Automated Yield on Your USDT
              </span>
              <br />
              <span className="text-gray-800">While You Chat</span>
            </h1>
            
            <p className="text-base text-gray-600 mb-8 leading-relaxed max-w-sm mx-auto animate-slide-in-left animate-delay-1">
              LINE Yield lets you maximize your stablecoin earnings through automated DeFi strategies, 
              directly within LINE Messenger. Set it and forget it.
            </p>
            
            <div className="flex flex-col gap-3 mb-8 animate-slide-in-left animate-delay-2">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="h-12 px-6 text-base font-semibold bg-gradient-to-r from-emerald-400 to-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-glow-pulse hover:animate-none touch-target"
              >
                <i className="fas fa-rocket mr-2"></i>
                Start Earning Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 px-6 text-base font-semibold border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-lg touch-target"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 animate-slide-in-left animate-delay-3 max-w-xs mx-auto">
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="text-xl font-extrabold text-green-800 mb-1">8.64%</div>
                <div className="text-xs text-gray-600">Average APY</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="text-xl font-extrabold text-green-800 mb-1">$12.4M</div>
                <div className="text-xs text-gray-600">Total Value Locked</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="text-xl font-extrabold text-green-800 mb-1">24/7</div>
                <div className="text-xs text-gray-600">Auto-Rebalancing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Dashboard Preview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Your Yield Dashboard</h3>
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-1">Total Balance</div>
              <div className="text-3xl font-extrabold text-green-800 mb-1">$12,458.90</div>
              <div className="text-green-600 font-semibold flex items-center justify-center gap-1 bg-green-50 px-3 py-1 rounded-full text-sm">
                <ArrowUp className="w-4 h-4" />
                +2.4% ($298.21)
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-green-100 hover:border-green-400 transition-all duration-300 cursor-pointer group touch-target">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-semibold text-gray-800">Deposit</div>
                </div>
              </div>
              <div className="p-3 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-green-100 hover:border-green-400 transition-all duration-300 cursor-pointer group touch-target">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <ArrowUp className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-semibold text-gray-800">Withdraw</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 p-4 rounded-xl text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-sm mb-1 opacity-90">Current APY</div>
                <div className="text-2xl font-extrabold">8.64%</div>
                <div className="text-xs mt-1 opacity-80">Auto-compounded daily</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Features Section */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <div className="text-green-600 font-semibold mb-3 text-sm">Why Choose LINE Yield</div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Maximize Your Earnings with Zero Effort</h2>
            <p className="text-base text-gray-600 max-w-sm mx-auto">
              Our platform combines the power of DeFi with the convenience of LINE Messenger
            </p>
          </div>
          
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-slide-up group border border-white/20">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-t-2xl"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 text-green-600 text-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Gasless Transactions</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Enjoy zero transaction fees with our gas abstraction technology. We sponsor all gas costs for your deposits and withdrawals.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all duration-300 group-hover:text-emerald-600">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-slide-up animate-delay-1 group border border-white/20">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-t-2xl"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 text-green-600 text-lg group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Auto-Rebalancing</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Our smart contracts automatically move your funds to the highest-yielding strategies across the Kaia ecosystem.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all duration-300 group-hover:text-emerald-600">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-slide-up animate-delay-2 group border border-white/20">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-t-2xl"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 text-green-600 text-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Secure & Audited</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                All smart contracts are thoroughly audited and built with security as the top priority. Your funds are always safe.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all duration-300 group-hover:text-emerald-600">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Trusted by Thousands</h2>
            <p className="text-base text-gray-600 max-w-sm mx-auto">
              Join our growing community of yield farmers
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mx-auto mb-2">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xl font-extrabold text-green-800 mb-1">2,847</div>
              <div className="text-xs text-gray-600">Active Users</div>
            </div>
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mx-auto mb-2">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-xl font-extrabold text-green-800 mb-1">$12.4M</div>
              <div className="text-xs text-gray-600">Total Deposits</div>
            </div>
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mx-auto mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xl font-extrabold text-green-800 mb-1">24/7</div>
              <div className="text-xs text-gray-600">Monitoring</div>
            </div>
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mx-auto mb-2">
                <Star className="w-4 h-4" />
              </div>
              <div className="text-xl font-extrabold text-green-800 mb-1">4.9/5</div>
              <div className="text-xs text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile How It Works Section */}
      <section id="how-it-works" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <div className="text-green-600 font-semibold mb-3 text-sm">Simple Process</div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Start Earning in Minutes</h2>
            <p className="text-base text-gray-600 max-w-sm mx-auto">
              Getting started with LINE Yield is easy and requires no technical knowledge
            </p>
          </div>
          
          <div className="space-y-6 max-w-sm mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-lg font-extrabold text-gray-600 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1 text-gray-800 text-base">Connect Wallet</h3>
                <p className="text-sm text-gray-600">Link your Kaia-compatible wallet to the LINE Mini App</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-lg font-extrabold text-gray-600 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1 text-gray-800 text-base">Deposit USDT</h3>
                <p className="text-sm text-gray-600">Add funds to your yield vault with one click</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-lg font-extrabold text-gray-600 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1 text-gray-800 text-base">Earn Automatically</h3>
                <p className="text-sm text-gray-600">Watch your balance grow with automated yield optimization</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-lg font-extrabold text-gray-600 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold mb-1 text-gray-800 text-base">Withdraw Anytime</h3>
                <p className="text-sm text-gray-600">Access your funds whenever you need them</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA Section */}
      <section className="py-12 bg-gradient-to-r from-green-800 to-blue-900 text-white rounded-xl mx-4 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold mb-4">Ready to Start Earning Yield?</h2>
          <p className="text-base opacity-90 max-w-sm mx-auto mb-8">
            Join thousands of users who are already growing their wealth with LINE Yield. No technical knowledge required.
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="h-12 px-6 text-base font-semibold bg-white text-green-800 hover:bg-gray-100 transition-all duration-300 touch-target"
            >
              <i className="fas fa-rocket mr-2"></i>
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 px-6 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 touch-target"
            >
              <FileText className="w-4 h-4 mr-2" />
              Read Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Chatbot */}
      <Chatbot />
    </div>
  );
};

export default MobileLanding;
