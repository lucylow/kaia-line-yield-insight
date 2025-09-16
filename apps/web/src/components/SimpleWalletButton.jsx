import React from 'react';

const SimpleWalletButton = ({ size = 'default', className = '' }) => {
  const handleConnect = () => {
    alert('Wallet connection clicked!');
  };

  return (
    <button 
      onClick={handleConnect}
      className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    >
      Connect Wallet
    </button>
  );
};

export default SimpleWalletButton;
