import React from 'react';
import { Button } from './ui/button';
import { Wallet, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useWallet } from '../providers/SimpleWalletProvider';
import { truncateAddress } from '../utils/formatters';
import { ConnectWalletButton } from './ConnectWalletButton';

interface WalletConnectButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showAddress?: boolean;
  showDisconnect?: boolean;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ 
  variant = 'default', 
  size = 'default', 
  className = '', 
  showAddress = true, 
  showDisconnect = true 
}) => {
  const { address, isConnected, connect, disconnect, balanceFormatted, symbol } = useWallet();
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert("Address copied to clipboard");
    }
  };

  const openExplorer = () => {
    if (address) {
      const explorerUrl = `https://scope.kaia.one/account/${address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        {showAddress && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <Wallet className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              {address ? truncateAddress(address, 6, 4) : 'Unknown'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="p-1 h-auto hover:bg-gray-200"
            >
              <Copy className="w-3 h-3 text-gray-500" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={openExplorer}
              className="p-1 h-auto hover:bg-gray-200"
            >
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </Button>
          </div>
        )}
        
        {showDisconnect && (
          <Button
            variant="outline"
            size="sm"
            onClick={disconnect}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </Button>
        )}
      </div>
    );
  }

  return (
    <ConnectWalletButton
      variant={variant}
      size={size}
      className={className}
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </ConnectWalletButton>
  );
};

export default WalletConnectButton;
