import React from 'react';
import { ConnectWalletButton } from '../components/ConnectWalletButton';
import { ConnectWallet } from '../components/ConnectWallet';
import { useWallet } from '../providers/SimpleWalletProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Wallet, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';

const WalletTest: React.FC = () => {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    connectionStatus, 
    balanceFormatted, 
    symbol, 
    walletType,
    chainId,
    isKaiaNetwork,
    connect,
    disconnect
  } = useWallet();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'connecting':
        return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Wallet className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'connecting':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Wallet Connection Test
          </h1>
          <p className="text-xl text-gray-600">
            Test the wallet connection functionality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon()}
                Connection Status
              </CardTitle>
              <CardDescription>
                Current wallet connection state
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge className={getStatusColor()}>
                  {connectionStatus}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connected:</span>
                <span className="text-sm">{isConnected ? 'Yes' : 'No'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connecting:</span>
                <span className="text-sm">{isConnecting ? 'Yes' : 'No'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Wallet Type:</span>
                <span className="text-sm">{walletType || 'None'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Chain ID:</span>
                <span className="text-sm">{chainId || 'None'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Kaia Network:</span>
                <span className="text-sm">{isKaiaNetwork ? 'Yes' : 'No'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Wallet Information
              </CardTitle>
              <CardDescription>
                Connected wallet details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isConnected ? (
                <>
                  <div>
                    <span className="text-sm font-medium">Address:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {address?.slice(0, 10)}...{address?.slice(-8)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyAddress}
                        className="p-1"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Balance:</span>
                    <span className="text-sm font-mono">
                      {balanceFormatted} {symbol}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={disconnect}
                      className="w-full"
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No wallet connected</p>
                  <Button onClick={connect} disabled={isConnecting}>
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Test Components */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Test Components</CardTitle>
              <CardDescription>
                Try different wallet connection components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect Wallet Button</h3>
                <div className="flex gap-4">
                  <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
                  <ConnectWalletButton variant="outline">Outline Button</ConnectWalletButton>
                  <ConnectWalletButton variant="ghost">Ghost Button</ConnectWalletButton>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Full Connect Wallet Component</h3>
                <ConnectWallet />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Debug Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
              <CardDescription>
                Technical details for debugging
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify({
                  address,
                  isConnected,
                  isConnecting,
                  connectionStatus,
                  balanceFormatted,
                  symbol,
                  walletType,
                  chainId,
                  isKaiaNetwork
                }, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletTest;
