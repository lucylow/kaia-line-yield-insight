import React from 'react';

// @lovable:main-app-component

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LINE Yield Platform
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A decentralized yield farming platform integrated with LINE ecosystem
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Welcome to LINE Yield</h2>
            <p className="text-gray-600 mb-4">
              Your gateway to decentralized finance on the LINE ecosystem.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;