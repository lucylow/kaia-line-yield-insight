import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

const walletOptions = [
  {
    id: 'google',
    name: 'Connect with Google',
    icon: (
      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">G</span>
      </div>
    ),
    action: 'external'
  },
  {
    id: 'line',
    name: 'Connect with LINE',
    icon: (
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
        </div>
      </div>
    ),
    action: 'external'
  },
  {
    id: 'apple',
    name: 'Connect with Apple',
    icon: (
      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      </div>
    ),
    action: 'external'
  },
  {
    id: 'naver',
    name: 'Connect with Naver',
    icon: (
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">N</span>
      </div>
    ),
    action: 'external'
  },
  {
    id: 'kakao',
    name: 'Connect with Kakao',
    icon: (
      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-sm"></div>
        </div>
      </div>
    ),
    action: 'external'
  },
  {
    id: 'okx',
    name: 'Connect with OKX Wallet',
    icon: (
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xs">OKX</span>
      </div>
    ),
    action: 'wallet',
    hasExternal: true
  },
  {
    id: 'bitget',
    name: 'Connect with Bitget Wallet',
    icon: (
      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xs">BG</span>
      </div>
    ),
    action: 'wallet',
    hasExternal: true
  }
];

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  onConnect
}) => {
  const handleWalletConnect = (walletType: string) => {
    onConnect(walletType);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full mx-4 p-0 bg-white rounded-2xl shadow-2xl">
        <div className="flex flex-col">
          {/* Header */}
          <DialogHeader className="flex-shrink-0 p-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-sm flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    Mini Dapp
                  </DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">Connect your wallet</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="space-y-3">
              {walletOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleWalletConnect(option.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-left"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {option.icon}
                    <span className="font-medium text-gray-900">{option.name}</span>
                  </div>
                  {option.hasExternal && (
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
