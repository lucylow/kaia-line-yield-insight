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
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleWalletConnect = async (walletType: string) => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Handle different wallet types
      if (walletType === 'okx' || walletType === 'bitget') {
        // For crypto wallets, simulate connection
        toast({
          title: "Wallet Connected",
          description: `Successfully connected ${walletType} wallet`,
        });
        setIsModalOpen(false);
      } else {
        // For social logins, show a message
        toast({
          title: "Social Login",
          description: `${walletType} login integration coming soon!`,
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      let errorMessage = "Connection failed";
      
      if (error instanceof Error) {
        if (error.message.includes('User rejected')) {
          errorMessage = "Connection cancelled by user";
        } else if (error.message.includes('No accounts found')) {
          errorMessage = "No wallet accounts found";
        } else if (error.message.includes('wallet not found')) {
          errorMessage = "Wallet not installed. Please install a compatible wallet.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setConnectionError(errorMessage);
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
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
        isLoading={isConnecting}
        error={connectionError}
      />
    </>
  );
};
