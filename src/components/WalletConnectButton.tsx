import React from 'react';
import { Button } from '@/components/ui/Button';
import { Wallet, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useWalletConnectModal } from '@/hooks/useWalletConnectModal';
import WalletConnectModal from './WalletConnectModal';
import { truncateAddress } from '@/utils/formatters';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showAddress?: boolean;
  showDisconnect?: boolean;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  showAddress = true,
  showDisconnect = true
}) => {
  const { isModalOpen, walletConnection, openModal, closeModal, handleWalletConnected, disconnectWallet } = useWalletConnectModal();
  const { toast } = useToast();

  const copyAddress = () => {
    if (walletConnection?.address) {
      navigator.clipboard.writeText(walletConnection.address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openExplorer = () => {
    if (walletConnection?.address) {
      // Open Kaia explorer
      const explorerUrl = `https://scope.kaia.one/account/${walletConnection.address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  if (walletConnection?.isConnected) {
    return (
      <div className="flex items-center gap-2">
        {showAddress && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <Wallet className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              {truncateAddress(walletConnection.address, 6, 4)}
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
            onClick={disconnectWallet}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </Button>
        )}
        
        <WalletConnectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onWalletConnected={handleWalletConnected}
        />
      </div>
    );
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={openModal}
        className={`flex items-center gap-2 ${className}`}
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
      
      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onWalletConnected={handleWalletConnected}
      />
    </>
  );
};