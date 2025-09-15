import React, { useState, useCallback } from 'react';

export const useWalletConnectModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletConnection, setWalletConnection] = useState(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleWalletConnected = useCallback((walletType, address) => {
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