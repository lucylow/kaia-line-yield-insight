import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  wallet: {
    address: string | null;
    isConnected: boolean;
    balance: string;
  };
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState({
    address: null as string | null,
    isConnected: false,
    balance: '0'
  });

  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      setWallet({
        address: mockAddress,
        isConnected: true,
        balance: '1000.0'
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // Reset wallet state on error
      setWallet({
        address: null,
        isConnected: false,
        balance: '0'
      });
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      balance: '0'
    });
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
