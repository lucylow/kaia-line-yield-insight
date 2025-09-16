import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// @lovable:wallet-provider

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  provider: any | null;
  chainId: number | null;
  balanceFormatted: string;
  symbol: string;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface SimpleWalletProviderProps {
  children: ReactNode;
}

export const SimpleWalletProvider: React.FC<SimpleWalletProviderProps> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    address: null,
    provider: null,
    chainId: null,
    balanceFormatted: '0.00',
    symbol: 'ETH',
  });

  const connect = async () => {
    try {
      setWalletState(prev => ({ ...prev, isConnecting: true }));
      
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        setWalletState({
          isConnected: true,
          isConnecting: false,
          address: accounts[0],
          provider: window.ethereum,
          chainId: parseInt(chainId, 16),
          balanceFormatted: '0.00', // Will be updated separately
          symbol: 'ETH',
        });
      } else {
        setWalletState(prev => ({ ...prev, isConnecting: false }));
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnect = () => {
    setWalletState({
      isConnected: false,
      isConnecting: false,
      address: null,
      provider: null,
      chainId: null,
      balanceFormatted: '0.00',
      symbol: 'ETH',
    });
  };

  const switchNetwork = async (chainId: number) => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
        setWalletState(prev => ({ ...prev, chainId }));
      }
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setWalletState(prev => ({ ...prev, address: accounts[0] }));
        }
      };

      const handleChainChanged = (chainId: string) => {
        setWalletState(prev => ({ ...prev, chainId: parseInt(chainId, 16) }));
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const value: WalletContextType = {
    ...walletState,
    connect,
    disconnect,
    switchNetwork,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a SimpleWalletProvider');
  }
  return context;
};

// Export useNetworkCheck for backward compatibility
export const useNetworkCheck = () => {
  const { chainId, isConnected, switchNetwork } = useWallet();
  
  const isCorrectNetwork = chainId === 8217; // Kaia mainnet
  const isWrongNetwork = isConnected && !isCorrectNetwork;
  
  return {
    isCorrectNetwork,
    isWrongNetwork,
    isConnected,
    currentChainId: chainId,
    switchToCorrectNetwork: () => switchNetwork(8217),
    switchToKaia: () => switchNetwork(8217)
  };
};