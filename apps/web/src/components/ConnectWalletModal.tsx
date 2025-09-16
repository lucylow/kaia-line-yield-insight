import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
  isLoading?: boolean;
  error?: string;
}

const walletOptions = [
  {
    id: 'google',
    name: 'Connect with Google',
    description: 'Sign in with your Google account',
    icon: (
      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-sm">G</span>
      </div>
    ),
    action: 'social',
    category: 'social',
    isInstalled: true,
    downloadUrl: null
  },
  {
    id: 'line',
    name: 'Connect with LINE',
    description: 'Sign in with your LINE account',
    icon: (
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
        <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
        </div>
      </div>
    ),
    action: 'social',
    category: 'social',
    isInstalled: true,
    downloadUrl: null
  },
  {
    id: 'apple',
    name: 'Connect with Apple',
    description: 'Sign in with your Apple ID',
    icon: (
      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      </div>
    ),
    action: 'social',
    category: 'social',
    isInstalled: true,
    downloadUrl: null
  },
  {
    id: 'naver',
    name: 'Connect with Naver',
    description: 'Sign in with your Naver account',
    icon: (
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-sm">N</span>
      </div>
    ),
    action: 'social',
    category: 'social',
    isInstalled: true,
    downloadUrl: null
  },
  {
    id: 'kakao',
    name: 'Connect with Kakao',
    description: 'Sign in with your Kakao account',
    icon: (
      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
        <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-sm"></div>
        </div>
      </div>
    ),
    action: 'social',
    category: 'social',
    isInstalled: true,
    downloadUrl: null
  },
  {
    id: 'okx',
    name: 'Connect with OKX Wallet',
    description: 'Connect your OKX crypto wallet',
    icon: (
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-xs">OKX</span>
      </div>
    ),
    action: 'wallet',
    category: 'crypto',
    isInstalled: false, // This would be detected dynamically
    downloadUrl: 'https://www.okx.com/web3',
    hasExternal: true
  },
  {
    id: 'bitget',
    name: 'Connect with Bitget Wallet',
    description: 'Connect your Bitget crypto wallet',
    icon: (
      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-xs">BG</span>
      </div>
    ),
    action: 'wallet',
    category: 'crypto',
    isInstalled: false, // This would be detected dynamically
    downloadUrl: 'https://web3.bitget.com',
    hasExternal: true
  }
];

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  isLoading = false,
  error
}) => {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setConnectingWallet(null);
      setShowError(false);
    }
  }, [isOpen]);

  // Show error state
  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  }, [error]);

  const handleWalletConnect = async (walletType: string) => {
    setConnectingWallet(walletType);
    try {
      await onConnect(walletType);
      // Don't close immediately, let the parent handle it
    } catch (err) {
      setConnectingWallet(null);
    }
  };

  const handleDownload = (downloadUrl: string) => {
    window.open(downloadUrl, '_blank');
  };

  // Group wallets by category
  const socialWallets = walletOptions.filter(w => w.category === 'social');
  const cryptoWallets = walletOptions.filter(w => w.category === 'crypto');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full mx-4 p-0 bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
        <div className="flex flex-col max-h-[90vh]">
          {/* Header */}
          <DialogHeader className="flex-shrink-0 p-6 pb-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-md flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    Mini Dapp
                  </DialogTitle>
                  <p className="text-sm text-gray-600 mt-1 font-medium">Connect your wallet</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </Button>
            </div>
          </DialogHeader>

          {/* Error Banner */}
          {showError && error && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowError(false)}
                className="ml-auto p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Social Login Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Social Login
              </h3>
              <div className="space-y-3">
                {socialWallets.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => handleWalletConnect(option.id)}
                    disabled={connectingWallet === option.id || isLoading}
                    className={cn(
                      "w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-left group",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      connectingWallet === option.id && "ring-2 ring-blue-500 ring-opacity-50"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {option.icon}
                        {connectingWallet === option.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {option.name}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                      </div>
                    </div>
                    {connectingWallet === option.id ? (
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Crypto Wallets Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Crypto Wallets
              </h3>
              <div className="space-y-3">
                {cryptoWallets.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => handleWalletConnect(option.id)}
                    disabled={connectingWallet === option.id || isLoading}
                    className={cn(
                      "w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-left group",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      connectingWallet === option.id && "ring-2 ring-purple-500 ring-opacity-50"
                    )}
                    style={{ animationDelay: `${(index + socialWallets.length) * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {option.icon}
                        {connectingWallet === option.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {option.name}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                        {!option.isInstalled && (
                          <p className="text-xs text-orange-600 mt-1 font-medium">
                            Wallet not detected
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {connectingWallet === option.id ? (
                        <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
                      ) : (
                        <>
                          {option.isInstalled ? (
                            <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(option.downloadUrl!);
                              }}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Download className="w-4 h-4 text-gray-400" />
                            </button>
                          )}
                          {option.hasExternal && (
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                By connecting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
