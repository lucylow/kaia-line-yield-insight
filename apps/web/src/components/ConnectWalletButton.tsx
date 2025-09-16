import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { ConnectWalletModal } from './ConnectWalletModal';
import { useToast } from '@/hooks/use-toast';

interface ConnectWalletButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children?: React.ReactNode;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'default',
  children
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleWalletConnect = async (walletType: string) => {
    try {
      // Handle different wallet types
      if (walletType === 'okx' || walletType === 'bitget') {
        // For crypto wallets, simulate connection
        toast({
          title: "Wallet Connected",
          description: `Successfully connected ${walletType} wallet`,
        });
      } else {
        // For social logins, show a message
        toast({
          title: "Social Login",
          description: `${walletType} login integration coming soon!`,
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant={variant}
        size={size}
        className={className}
      >
        {children || (
          <>
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </>
        )}
      </Button>
      
      <ConnectWalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </>
  );
};
