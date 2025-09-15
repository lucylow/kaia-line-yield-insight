import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WalletConnectButton } from './WalletConnectButton';
import { useWalletConnectModal } from '@/hooks/useWalletConnectModal';
import { Badge } from '@/components/ui/badge';
import { Wallet, Copy, ExternalLink } from 'lucide-react';
import { truncateAddress } from '@/utils/formatters';

export const WalletIntegrationExample: React.FC = () => {
  const { walletConnection } = useWalletConnectModal();

  const copyAddress = () => {
    if (walletConnection?.address) {
      navigator.clipboard.writeText(walletConnection.address);
    }
  };

  const openExplorer = () => {
    if (walletConnection?.address) {
      const explorerUrl = `https://scope.kaia.one/account/${walletConnection.address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet Integration Example</h2>
        <p className="text-gray-600">
          This example shows how to integrate the wallet connection feature into your components
        </p>
      </div>

      {/* Wallet Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {walletConnection?.isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Connection Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Wallet Type</span>
                <Badge variant="outline">
                  {walletConnection.walletType}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Address</span>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="font-mono text-sm">
                    {truncateAddress(walletConnection.address, 8, 6)}
                  </span>
                  <button
                    onClick={copyAddress}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={openExplorer}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Wallet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No wallet connected</p>
              <WalletConnectButton />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Simple wallet connection button with default styling
              </p>
              <WalletConnectButton />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Styling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Custom styled wallet connection button
              </p>
              <WalletConnectButton 
                variant="outline"
                size="lg"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Code Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-100 overflow-x-auto">
            <pre>{`import { WalletConnectButton } from '@/components/WalletConnectButton';
import { useWalletConnectModal } from '@/hooks/useWalletConnectModal';

function MyComponent() {
  const { walletConnection } = useWalletConnectModal();

  return (
    <div>
      {walletConnection?.isConnected ? (
        <div>
          <p>Connected to: {walletConnection.walletType}</p>
          <p>Address: {walletConnection.address}</p>
        </div>
      ) : (
        <WalletConnectButton 
          variant="default"
          size="lg"
          showAddress={true}
          showDisconnect={true}
        />
      )}
    </div>
  );
}`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
