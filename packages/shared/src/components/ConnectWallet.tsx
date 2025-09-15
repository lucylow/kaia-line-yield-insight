import React from 'react';
import { Button } from './Button';
import { useUniversalWallet } from '../hooks/useUniversalWallet';
import { usePlatform } from '../hooks/usePlatform';

export interface ConnectWalletProps {
  className?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  className,
  onConnect,
  onDisconnect
}) => {
  const { wallet, connectWallet, disconnectWallet, isLoading, error } = useUniversalWallet();
  const { isLiff, isWeb } = usePlatform();

  const handleConnect = async () => {
    try {
      await connectWallet();
      onConnect?.();
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    onDisconnect?.();
  };

  if (wallet.isConnected) {
    return (
      <div className={`flex items-center space-x-4 ${className || ''}`}>
        <div className="text-sm text-gray-600">
          <div className="font-medium">
            {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
          </div>
          <div className="text-xs">
            {wallet.balance} {wallet.symbol}
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleDisconnect}
          disabled={isLoading}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <Button
        onClick={handleConnect}
        loading={isLoading}
        className="w-full"
      >
        {isLiff ? 'Connect LINE Wallet' : 'Connect MetaMask'}
      </Button>
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
};
