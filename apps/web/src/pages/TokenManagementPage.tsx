import React from 'react';
import { TokenManagementPanel } from '@/components/TokenManagementPanel';
import { KaiaWalletConnection } from '@/components/KaiaWalletConnection';
import { useKaiaWallet } from '@/hooks/useKaiaWallet';

export const TokenManagementPage: React.FC = () => {
  const { isConnected } = useKaiaWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!isConnected && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Connect your wallet to manage tokens and interact with smart contracts
            </p>
          </div>
        )}
        <TokenManagementPanel />
      </div>
    </div>
  );
};

export default TokenManagementPage;



