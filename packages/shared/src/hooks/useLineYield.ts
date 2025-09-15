import { useState, useEffect, useCallback } from 'react';
import { useUniversalWallet } from './useUniversalWallet';
import { usePlatform } from './usePlatform';

export interface VaultData {
  userAssets: string;
  earnedYield: string;
  apy: string;
  totalValueLocked: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'claim';
  amount: string;
  timestamp: number;
  hash: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface LineYieldHook {
  vaultData: VaultData | null;
  deposit: (amount: string) => Promise<void>;
  withdraw: (amount: string) => Promise<void>;
  claimRewards: () => Promise<void>;
  isLoading: boolean;
  isDepositing: boolean;
  isWithdrawing: boolean;
  isClaiming: boolean;
  error: string | null;
}

export function useLineYield(): LineYieldHook {
  const { wallet } = useUniversalWallet();
  const { isLiff, isWeb } = usePlatform();
  const [vaultData, setVaultData] = useState<VaultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  const mockVaultData: VaultData = {
    userAssets: '1,250.50',
    earnedYield: '45.20',
    apy: '8.5',
    totalValueLocked: '2,400,000',
    transactions: [
      {
        id: '1',
        type: 'deposit',
        amount: '1000',
        timestamp: Date.now() - 86400000,
        hash: '0x123...abc',
        status: 'completed'
      },
      {
        id: '2',
        type: 'deposit',
        amount: '250.50',
        timestamp: Date.now() - 43200000,
        hash: '0x456...def',
        status: 'completed'
      }
    ]
  };

  // Fetch vault data
  const fetchVaultData = useCallback(async () => {
    if (!wallet.isConnected) {
      setVaultData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVaultData(mockVaultData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch vault data');
    } finally {
      setIsLoading(false);
    }
  }, [wallet.isConnected]);

  // Deposit function
  const deposit = useCallback(async (amount: string) => {
    if (!wallet.isConnected) {
      throw new Error('Wallet not connected');
    }

    setIsDepositing(true);
    setError(null);

    try {
      if (isLiff) {
        // Use relayer for gasless transactions in LIFF
        await simulateGaslessTransaction('deposit', amount);
      } else {
        // Direct wallet transaction for web
        await simulateDirectTransaction('deposit', amount);
      }

      // Refresh vault data
      await fetchVaultData();
    } catch (err: any) {
      setError(err.message || 'Deposit failed');
      throw err;
    } finally {
      setIsDepositing(false);
    }
  }, [wallet.isConnected, isLiff, fetchVaultData]);

  // Withdraw function
  const withdraw = useCallback(async (amount: string) => {
    if (!wallet.isConnected) {
      throw new Error('Wallet not connected');
    }

    setIsWithdrawing(true);
    setError(null);

    try {
      if (isLiff) {
        // Use relayer for gasless transactions in LIFF
        await simulateGaslessTransaction('withdraw', amount);
      } else {
        // Direct wallet transaction for web
        await simulateDirectTransaction('withdraw', amount);
      }

      // Refresh vault data
      await fetchVaultData();
    } catch (err: any) {
      setError(err.message || 'Withdrawal failed');
      throw err;
    } finally {
      setIsWithdrawing(false);
    }
  }, [wallet.isConnected, isLiff, fetchVaultData]);

  // Claim rewards function
  const claimRewards = useCallback(async () => {
    if (!wallet.isConnected) {
      throw new Error('Wallet not connected');
    }

    setIsClaiming(true);
    setError(null);

    try {
      if (isLiff) {
        // Use relayer for gasless transactions in LIFF
        await simulateGaslessTransaction('claim', '0');
      } else {
        // Direct wallet transaction for web
        await simulateDirectTransaction('claim', '0');
      }

      // Refresh vault data
      await fetchVaultData();
    } catch (err: any) {
      setError(err.message || 'Claim failed');
      throw err;
    } finally {
      setIsClaiming(false);
    }
  }, [wallet.isConnected, isLiff, fetchVaultData]);

  // Simulate gasless transaction (LIFF)
  const simulateGaslessTransaction = async (type: string, amount: string) => {
    // Simulate relayer call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Gasless ${type} transaction: ${amount} USDT`);
  };

  // Simulate direct transaction (Web)
  const simulateDirectTransaction = async (type: string, amount: string) => {
    // Simulate MetaMask transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(`Direct ${type} transaction: ${amount} USDT`);
  };

  // Fetch data when wallet connects
  useEffect(() => {
    fetchVaultData();
  }, [fetchVaultData]);

  return {
    vaultData,
    deposit,
    withdraw,
    claimRewards,
    isLoading,
    isDepositing,
    isWithdrawing,
    isClaiming,
    error
  };
}
