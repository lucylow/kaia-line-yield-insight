import React from 'react'
import { WalletConnectButton } from './components/WalletConnectButton'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Kaia LINE Yield Insight
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            DeFi yield farming and trading platform on Kaia blockchain
          </p>
          <div className="mb-8">
            <WalletConnectButton size="lg" className="px-8 py-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p className="text-gray-600 mb-4">View your portfolio and earnings</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Go to Dashboard
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Payment Demo</h3>
            <p className="text-gray-600 mb-4">QR code payment system</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Try Payment
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Kaia Payments</h3>
            <p className="text-gray-600 mb-4">Kaia blockchain payments</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Kaia Pay
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">DeFi Demo</h3>
            <p className="text-gray-600 mb-4">Yield farming and staking</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Start Farming
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Trade & Earn</h3>
            <p className="text-gray-600 mb-4">Trading with rewards</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Start Trading
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Verification</h3>
            <p className="text-gray-600 mb-4">Token management</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Manage Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App