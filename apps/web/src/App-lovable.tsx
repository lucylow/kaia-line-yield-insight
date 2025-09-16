import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// @lovable:main-app-component

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              LINE Yield Platform
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A decentralized yield farming platform integrated with LINE ecosystem
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Dashboard Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  📊 Dashboard
                </h2>
                <p className="text-gray-600 mb-4">
                  View your yield farming performance and analytics
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  View Dashboard
                </button>
              </div>

              {/* Yield Strategies Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  🌱 Yield Strategies
                </h2>
                <p className="text-gray-600 mb-4">
                  Discover and manage yield farming strategies
                </p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Explore Strategies
                </button>
              </div>

              {/* NFT Marketplace Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  🎨 NFT Marketplace
                </h2>
                <p className="text-gray-600 mb-4">
                  Trade NFTs and use them as collateral
                </p>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                  Browse NFTs
                </button>
              </div>

              {/* Referral System Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  🎯 Referral System
                </h2>
                <p className="text-gray-600 mb-4">
                  Invite friends and earn rewards
                </p>
                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
                  Invite Friends
                </button>
              </div>

              {/* Transaction History Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  📋 Transaction History
                </h2>
                <p className="text-gray-600 mb-4">
                  View your transaction history and analytics
                </p>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                  View History
                </button>
              </div>

              {/* Wallet Connect Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  🔗 Connect Wallet
                </h2>
                <p className="text-gray-600 mb-4">
                  Connect your wallet to start earning yield
                </p>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  Connect Wallet
                </button>
              </div>
            </div>

            {/* Additional Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  💳 Payments
                </h3>
                <p className="text-gray-600">
                  Seamless payment integration with LINE ecosystem
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  📈 Trading
                </h3>
                <p className="text-gray-600">
                  Advanced trading features and portfolio management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
