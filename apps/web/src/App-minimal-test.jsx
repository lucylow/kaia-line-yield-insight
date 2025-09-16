import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Kaia LINE Yield Insight
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          DeFi yield farming and trading platform on Kaia blockchain
        </p>
        <button 
          onClick={() => alert('Hello!')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default App;
