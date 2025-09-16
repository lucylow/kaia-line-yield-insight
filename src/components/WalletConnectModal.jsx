import React, { useState } from 'react';
import { ExternalLink, RefreshCw, X } from 'lucide-react';

const WalletConnectModal = ({
  isOpen,
  onClose,
  onWalletConnected
}) => {
  const [connectingWallet, setConnectingWallet] = useState(null);

  if (!isOpen) return null;

  const walletOptions = [
    {
      id: 'google',
      name: 'Connect with Google',
      icon: (
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'line',
      name: 'Connect with LINE',
      icon: (
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12.017.572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'apple',
      name: 'Connect with Apple',
      icon: (
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'naver',
      name: 'Connect with Naver',
      icon: (
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'kakao',
      name: 'Connect with Kakao',
      icon: (
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.751 3 2.5 6.686 2.5 11.25c0 2.723 1.521 5.124 3.875 6.651l-.994 3.651c-.067.246.188.442.399.306L9.421 19.5C10.25 19.827 11.108 20 12 20c5.249 0 9.5-3.686 9.5-8.25S17.249 3 12 3z"/>
          </svg>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'okx',
      name: 'Connect with OKX Wallet',
      icon: (
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">OKX</span>
        </div>
      ),
      isExternal: true
    },
    {
      id: 'bitget',
      name: 'Connect with Bitget Wallet',
      icon: (
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">BG</span>
        </div>
      ),
      isExternal: true
    }
  ];

  const handleWalletConnect = async (walletId) => {
    setConnectingWallet(walletId);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock address
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      
      alert(`Connected to ${walletOptions.find(w => w.id === walletId)?.name}`);
      
      onWalletConnected?.(walletId, mockAddress);
      onClose();
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('Failed to connect wallet');
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Header */}
        <div className="pt-8 pb-6 px-6 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
              <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
              <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mini Dapp</h2>
          <p className="text-gray-500">Connect your wallet</p>
        </div>

        {/* Wallet Options */}
        <div className="px-6 pb-6">
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group ${
                  connectingWallet === wallet.id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleWalletConnect(wallet.id)}
                disabled={connectingWallet !== null}
              >
                <div className="flex items-center gap-4">
                  {wallet.icon}
                  <span className="font-medium text-gray-900 text-lg">{wallet.name}</span>
                </div>
                
                {connectingWallet === wallet.id ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-gray-400" />
                ) : wallet.isExternal ? (
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModal;