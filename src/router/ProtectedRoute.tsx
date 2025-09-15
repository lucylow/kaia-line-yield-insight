import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useWallet } from '../providers/SimpleWalletProvider';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isConnected, connect, isConnecting } = useWallet();
  const location = useLocation();

  // Show loading spinner while checking wallet connection
  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If not connected, show wallet connection prompt
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <span className="text-white font-bold text-2xl">LY</span>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
              Connect Your Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-gray-600">
              <p className="mb-4">
                To access the LINE Yield platform, you need to connect your wallet.
              </p>
              <p className="text-sm">
                This will allow you to interact with DeFi protocols, manage your assets, and earn yield.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={connect}
                className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                size="lg"
              >
                Connect Wallet
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Back to Home
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              <p>By connecting your wallet, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If connected, render the protected content
  return <>{children}</>;
};

// Higher-order component for route-level protection
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => (
    <ProtectedRoute>
      <Component {...props} />
    </ProtectedRoute>
  );
};
