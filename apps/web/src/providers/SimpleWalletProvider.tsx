import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotificationContext } from './NotificationProvider';

interface WalletInfo {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
  chainId: number | undefined;
  balance: string | undefined;
  balanceFormatted: string | undefined;
  symbol: string | undefined;
  isKaiaNetwork: boolean;
  walletType: string | undefined;
  connectionStatus: 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
  lastTransactionHash: string | undefined;
  transactionHistory: Array<{
    hash: string;
    type: 'send' | 'receive' | 'swap' | 'deposit' | 'withdraw';
    amount: string;
    timestamp: number;
    status: 'pending' | 'confirmed' | 'failed';
  }>;
}

interface WalletContextType extends WalletInfo {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToKaia: () => Promise<void>;
  openAppKit: () => void;
  refreshBalance: () => Promise<void>;
  getTransactionStatus: (hash: string) => Promise<'pending' | 'confirmed' | 'failed'>;
  addTransaction: (tx: WalletInfo['transactionHistory'][0]) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface SimpleWalletProviderProps {
  children: React.ReactNode;
}

export function SimpleWalletProvider({ children }: SimpleWalletProviderProps) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: undefined,
    isConnected: false,
    isConnecting: false,
    isDisconnected: true,
    chainId: undefined,
    balance: undefined,
    balanceFormatted: undefined,
    symbol: undefined,
    isKaiaNetwork: false,
    walletType: undefined,
    connectionStatus: 'idle',
    lastTransactionHash: undefined,
    transactionHistory: [],
  });

  // Auto-refresh balance every 30 seconds when connected
  useEffect(() => {
    if (walletInfo.isConnected) {
      const interval = setInterval(() => {
        refreshBalance();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [walletInfo.isConnected]);

  // Check for wallet connection on mount
  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet(accounts[0]);
        }
      }
    } catch (error) {
      console.warn('Failed to check existing connection:', error);
    }
  };

  const connectWallet = async (address: string) => {
    try {
      // Check if we have a real Ethereum provider
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
        const balance = await (window as any).ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        });

        setWalletInfo({
          address,
          isConnected: true,
          isConnecting: false,
          isDisconnected: false,
          chainId: parseInt(chainId, 16),
          balance: balance,
          balanceFormatted: (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4),
          symbol: 'KAIA',
          isKaiaNetwork: parseInt(chainId, 16) === 8217,
          walletType: 'MetaMask',
          connectionStatus: 'connected',
          lastTransactionHash: undefined,
          transactionHistory: [],
        });
      } else {
        // Fallback for demo/simulation mode
        setWalletInfo({
          address,
          isConnected: true,
          isConnecting: false,
          isDisconnected: false,
          chainId: 8217,
          balance: '1000000000000000000',
          balanceFormatted: '1.0',
          symbol: 'KAIA',
          isKaiaNetwork: true,
          walletType: 'Demo',
          connectionStatus: 'connected',
          lastTransactionHash: undefined,
          transactionHistory: [],
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletInfo(prev => ({ 
        ...prev, 
        isConnecting: false, 
        connectionStatus: 'error' 
      }));
    }
  };

  const connect = async () => {
    setWalletInfo(prev => ({ 
      ...prev, 
      isConnecting: true, 
      connectionStatus: 'connecting' 
    }));
    
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          await connectWallet(accounts[0]);
        } else {
          throw new Error('No accounts found');
        }
      } else {
        // Fallback to simulated connection for demo purposes
        const demoAddress = '0x' + Math.random().toString(16).substr(2, 40);
        await connectWallet(demoAddress);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setWalletInfo(prev => ({ 
        ...prev, 
        isConnecting: false, 
        connectionStatus: 'error' 
      }));
      throw error; // Re-throw so the UI can handle it
    }
  };

  const disconnect = () => {
    setWalletInfo({
      address: undefined,
      isConnected: false,
      isConnecting: false,
      isDisconnected: true,
      chainId: undefined,
      balance: undefined,
      balanceFormatted: undefined,
      symbol: undefined,
      isKaiaNetwork: false,
      walletType: undefined,
      connectionStatus: 'disconnected',
      lastTransactionHash: undefined,
      transactionHistory: [],
    });
  };

  const switchToKaia = async () => {
    if (walletInfo.isConnected) {
      try {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2019' }], // 8217 in hex
        });
        setWalletInfo(prev => ({ ...prev, chainId: 8217, isKaiaNetwork: true }));
      } catch (error) {
        console.error('Failed to switch to Kaia network:', error);
      }
    }
  };

  const refreshBalance = async () => {
    if (walletInfo.isConnected && walletInfo.address) {
      try {
        const balance = await (window as any).ethereum.request({
          method: 'eth_getBalance',
          params: [walletInfo.address, 'latest'],
        });
        
        setWalletInfo(prev => ({
          ...prev,
          balance: balance,
          balanceFormatted: (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4),
        }));
      } catch (error) {
        console.error('Failed to refresh balance:', error);
      }
    }
  };

  const getTransactionStatus = async (hash: string): Promise<'pending' | 'confirmed' | 'failed'> => {
    try {
      const receipt = await (window as any).ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [hash],
      });
      
      if (receipt) {
        return receipt.status === '0x1' ? 'confirmed' : 'failed';
      }
      return 'pending';
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return 'failed';
    }
  };

  const addTransaction = (tx: WalletInfo['transactionHistory'][0]) => {
    setWalletInfo(prev => ({
      ...prev,
      lastTransactionHash: tx.hash,
      transactionHistory: [tx, ...prev.transactionHistory.slice(0, 49)], // Keep last 50
    }));
  };

  const openAppKit = () => {
    connect();
  };

  const contextValue: WalletContextType = {
    ...walletInfo,
    connect,
    disconnect,
    switchToKaia,
    openAppKit,
    refreshBalance,
    getTransactionStatus,
    addTransaction,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a SimpleWalletProvider');
  }
  return context;
}

export function useNetworkCheck() {
  const { chainId, isConnected, switchToKaia } = useWallet();
  
  const isCorrectNetwork = chainId === 8217;
  
  return {
    isCorrectNetwork,
    isConnected,
    switchToCorrectNetwork: switchToKaia,
    currentChainId: chainId,
    targetChainId: 8217,
  };
}
