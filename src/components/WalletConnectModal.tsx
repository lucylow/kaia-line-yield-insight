import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet, ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WalletProviderSDK, WalletType } from '@/sdk/WalletProviderSDK';
import { useKaiaWallet } from '@/hooks/useKaiaWallet';
import { cn } from '@/lib/utils';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnected?: (walletType: WalletType, address: string) => void;
}

interface WalletOption {
  id: WalletType | string;
  name: string;
  icon: React.ReactNode;
  description?: string;
  isExternal?: boolean;
  isSocial?: boolean;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
  onWalletConnected
}) => {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const { toast } = useToast();
  const walletSDK = new WalletProviderSDK();

  const walletOptions: WalletOption[] = [
    {
      id: WalletType.KAIA_WALLET,
      name: 'Connect with Kaia Wallet',
      icon: (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Wallet className="w-4 h-4 text-white" />
        </div>
      ),
      isExternal: false
    },
    {
      id: 'google',
      name: 'Connect with Google',
      icon: (
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'line',
      name: 'Connect with LINE',
      icon: (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-1 h-1 bg-green-500 rounded-full ml-0.5"></div>
            <div className="w-1 h-1 bg-green-500 rounded-full ml-0.5"></div>
          </div>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'apple',
      name: 'Connect with Apple',
      icon: (
        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'naver',
      name: 'Connect with Naver',
      icon: (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
      ),
      isSocial: true
    },
    {
      id: 'kakao',
      name: 'Connect with Kakao',
      icon: (
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full ml-0.5"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full ml-0.5"></div>
          </div>
        </div>
      ),
      isSocial: true
    },
    {
      id: WalletType.OKX_WALLET,
      name: 'Connect with OKX Wallet',
      icon: (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">OKX</span>
        </div>
      ),
      isExternal: true
    },
    {
      id: WalletType.BITGET_WALLET,
      name: 'Connect with Bitget Wallet',
      icon: (
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">BG</span>
        </div>
      ),
      isExternal: true
    }
  ];

  const handleWalletConnect = async (walletId: string) => {
    setConnectingWallet(walletId);
    
    try {
      let address: string;
      
      if (walletId === 'google' || walletId === 'line' || walletId === 'apple' || walletId === 'naver' || walletId === 'kakao') {
        // Handle social login wallets
        address = await handleSocialLogin(walletId);
      } else if (walletId === WalletType.KAIA_WALLET) {
        // Handle Kaia wallet using existing hook
        const { connectWallet } = useKaiaWallet();
        address = await connectWallet() || '';
      } else {
        // Handle other crypto wallets using SDK
        const walletType = walletId as WalletType;
        const connection = await walletSDK.connectWallet(walletType);
        address = connection.address;
      }

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletOptions.find(w => w.id === walletId)?.name}`,
      });

      onWalletConnected?.(walletId as WalletType, address);
      onClose();
    } catch (error) {
      console.error('Wallet connection failed:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: "destructive",
      });
    } finally {
      setConnectingWallet(null);
    }
  };

  const handleSocialLogin = async (provider: string): Promise<string> => {
    // Mock implementation for social login
    // In a real implementation, this would integrate with the respective OAuth providers
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
        resolve(mockAddress);
      }, 1000);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full mx-4 p-0 bg-white rounded-2xl shadow-2xl">
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-1 h-1 bg-green-500 rounded-full ml-0.5"></div>
                  <div className="w-1 h-1 bg-green-500 rounded-full ml-0.5"></div>
                </div>
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">Mini Dapp</DialogTitle>
                <p className="text-sm text-gray-500">Connect your wallet</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Wallet Options */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-3">
              {walletOptions.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className={cn(
                    "w-full h-14 flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200",
                    connectingWallet === wallet.id && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleWalletConnect(wallet.id)}
                  disabled={connectingWallet !== null}
                >
                  <div className="flex items-center gap-3">
                    {wallet.icon}
                    <span className="font-medium text-gray-900">{wallet.name}</span>
                  </div>
                  
                  {connectingWallet === wallet.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                  ) : wallet.isExternal ? (
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  ) : null}
                </Button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectModal;
