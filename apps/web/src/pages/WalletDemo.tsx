import React from 'react';
import { ConnectWalletButton } from '../components/ConnectWalletButton';
import { ConnectWallet } from '../components/ConnectWallet';

const WalletDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Wallet Demo
          </h1>
          <p className="text-xl text-gray-600">
            Experience the new wallet connection modal design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Button Variants */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Button Variants
            </h2>
            <div className="space-y-4">
              <ConnectWalletButton className="w-full">
                Default Button
              </ConnectWalletButton>
              
              <ConnectWalletButton 
                variant="outline" 
                className="w-full"
              >
                Outline Button
              </ConnectWalletButton>
              
              <ConnectWalletButton 
                variant="ghost" 
                className="w-full"
              >
                Ghost Button
              </ConnectWalletButton>
            </div>
          </div>

          {/* Full Component */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Full Component
            </h2>
            <ConnectWallet />
          </div>
        </div>

        {/* Modal Preview */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Modal Preview
          </h2>
          <p className="text-gray-600 mb-6">
            Click any of the buttons above to see the new connect wallet modal in action.
            The modal includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Google, LINE, Apple, Naver, Kakao social login options</li>
            <li>OKX Wallet and Bitget Wallet crypto wallet options</li>
            <li>Clean, modern design matching the provided mockup</li>
            <li>External link indicators for wallet connections</li>
            <li>Responsive design for mobile and desktop</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletDemo;
