import { useState, useCallback } from 'react';
import { WalletType } from '@/sdk/WalletProviderSDK';

interface WalletConnection {
  walletType: WalletType | string;
  address: string;
  isConnected: boolean;
}

export const useWalletConnectModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletConnection, setWalletConnection] = useState<WalletConnection | null>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleWalletConnected = useCallback((walletType: WalletType | string, address: string) => {
    setWalletConnection({
      walletType,
      address,
      isConnected: true
    });
    setIsModalOpen(false);
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletConnection(null);
  }, []);

  return {
    isModalOpen,
    walletConnection,
    openModal,
    closeModal,
    handleWalletConnected,
    disconnectWallet
  };
};
