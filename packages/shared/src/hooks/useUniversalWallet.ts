import { useState, useEffect, useCallback } from 'react';
import { usePlatform } from './usePlatform';

export interface WalletInfo {
  address: string | null;
  isConnected: boolean;
  balance: string;
  symbol: string;
  chainId: number;
  walletType: 'metamask' | 'line' | 'none';
}

export interface UniversalWalletHook {
  wallet: WalletInfo;
  connectWallet: (options?: { type?: 'metamask' | 'line' }) => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
  error: string | null;
}

export function useUniversalWallet(): UniversalWalletHook {
  const { isLiff, isWeb } = usePlatform();
  const [wallet, setWallet] = useState<WalletInfo>({
    address: null,
    isConnected: false,
    balance: '0',
    symbol: 'KAI',
    chainId: 1,
    walletType: 'none'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if MetaMask is available
  const isMetaMaskAvailable = () => {
    return typeof window !== 'undefined' && (window as any).ethereum?.isMetaMask;
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    if (!isMetaMaskAvailable()) {
      throw new Error('MetaMask not detected. Please install MetaMask.');
    }

    try {
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        const balance = await (window as any).ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });

        const chainId = await (window as any).ethereum.request({
          method: 'eth_chainId'
        });

        setWallet({
          address: accounts[0],
          isConnected: true,
          balance: (parseInt(balance, 16) / 1e18).toFixed(4),
          symbol: 'KAI',
          chainId: parseInt(chainId, 16),
          walletType: 'metamask'
        });
      }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to connect to MetaMask');
    }
  };

  // Connect to LINE Wallet (LIFF)
  const connectLineWallet = async () => {
    if (!isLiff || typeof window === 'undefined' || !(window as any).liff) {
      throw new Error('LINE LIFF not available');
    }

    try {
      const liff = (window as any).liff;
      
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const profile = await liff.getProfile();
      // In a real implementation, you would get the wallet address from LINE
      // For now, we'll simulate it
      const mockAddress = `0x${profile.userId.slice(0, 40).padEnd(40, '0')}`;
      
      setWallet({
        address: mockAddress,
        isConnected: true,
        balance: '0',
        symbol: 'KAI',
        chainId: 1,
        walletType: 'line'
      });
    } catch (err: any) {
      throw new Error(err.message || 'Failed to connect to LINE Wallet');
    }
  };

  const connectWallet = useCallback(async (options?: { type?: 'metamask' | 'line' }) => {
    setIsLoading(true);
    setError(null);

    try {
      if (isLiff && (!options?.type || options.type === 'line')) {
        await connectLineWallet();
      } else if (isWeb && (!options?.type || options.type === 'metamask')) {
        await connectMetaMask();
      } else {
        throw new Error('Unsupported wallet type for current platform');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isLiff, isWeb]);

  const disconnectWallet = useCallback(() => {
    setWallet({
      address: null,
      isConnected: false,
      balance: '0',
      symbol: 'KAI',
      chainId: 1,
      walletType: 'none'
    });
    setError(null);
  }, []);

  // Auto-connect on mount if previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem('line-yield-wallet');
    if (savedWallet) {
      try {
        const walletData = JSON.parse(savedWallet);
        if (walletData.isConnected) {
          setWallet(walletData);
        }
      } catch (err) {
        localStorage.removeItem('line-yield-wallet');
      }
    }
  }, []);

  // Save wallet state to localStorage
  useEffect(() => {
    if (wallet.isConnected) {
      localStorage.setItem('line-yield-wallet', JSON.stringify(wallet));
    } else {
      localStorage.removeItem('line-yield-wallet');
    }
  }, [wallet]);

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    isLoading,
    error
  };
}
