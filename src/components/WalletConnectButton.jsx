import React from 'react';
import { Wallet, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useWalletConnectModal } from '../hooks/useWalletConnectModal';
import WalletConnectModal from './WalletConnectModal';

const truncateAddress = (address, start = 6, end = 4) => {
  if (!address) return '';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

export const WalletConnectButton = ({
  variant = 'default',
  size = 'default',
  className = '',
  showAddress = true,
  showDisconnect = true
}) => {
  const { isModalOpen, walletConnection, openModal, closeModal, handleWalletConnected, disconnectWallet } = useWalletConnectModal();

  const copyAddress = () => {
    if (walletConnection?.address) {
      navigator.clipboard.writeText(walletConnection.address);
      alert('Address copied to clipboard!');
    }
  };

  const openExplorer = () => {
    if (walletConnection?.address) {
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
            <button
              onClick={copyAddress}
              className="p-1 h-auto hover:bg-gray-200 rounded"
            >
              <Copy className="w-3 h-3 text-gray-500" />
            </button>
            <button
              onClick={openExplorer}
              className="p-1 h-auto hover:bg-gray-200 rounded"
            >
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        )}
        
        {showDisconnect && (
          <button
            onClick={disconnectWallet}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </button>
        )}
        
        <WalletConnectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onWalletConnected={handleWalletConnected}
        />
      </div>
    );
  }

  const buttonClass = `flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`;

  return (
    <>
      <button
        onClick={openModal}
        className={buttonClass}
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </button>
      
      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onWalletConnected={handleWalletConnected}
      />
    </>
  );
};