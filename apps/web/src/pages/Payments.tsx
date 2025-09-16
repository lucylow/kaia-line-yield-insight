import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useWallet } from '@/hooks/useWallet';
import { useKaiaPayments } from '@/hooks/useKaiaPayments';
import { usePayments } from '@/hooks/usePayments';
import KaiaPaymentModal from '@/components/KaiaPaymentModal';
import { QRPayment } from '@/components/QRPayment';
import { QRPaymentHistory } from '@/components/QRPaymentHistory';
import { PaymentHistory } from '@/components/PaymentHistory';
import { 
  CreditCard, 
  Coins, 
  QrCode, 
  History, 
  TrendingUp, 
  Wallet, 
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isKaiaModalOpen, setIsKaiaModalOpen] = useState(false);
  
  const wallet = useWallet();
  const { 
    isLoading: kaiaLoading, 
    error: kaiaError, 
    payments: kaiaPayments, 
    stats: kaiaStats, 
    balance: kaiaBalance,
    getUserPayments,
    getPaymentStats,
    getKaiaBalance,
    formatAmount: formatKaiaAmount,
    getStatusColor: getKaiaStatusColor,
    getStatusIcon: getKaiaStatusIcon
  } = useKaiaPayments();
  
  const {
    isLoading: paymentLoading,
    error: paymentError,
    paymentHistory,
    paymentStats,
    getPaymentHistory,
    getPaymentStats: getPaymentStatsData,
    formatAmount: formatPaymentAmount,
    getStatusColor: getPaymentStatusColor,
    getStatusIcon: getPaymentStatusIcon
  } = usePayments(wallet.address);

  // Load data when wallet connects
  React.useEffect(() => {
    if (wallet.isConnected && wallet.address) {
      getUserPayments();
      getPaymentStats();
      getKaiaBalance();
      getPaymentHistory();
      getPaymentStatsData();
    }
  }, [wallet.isConnected, wallet.address]);

  const handleRefresh = () => {
    if (wallet.isConnected && wallet.address) {
      getUserPayments();
      getPaymentStats();
      getKaiaBalance();
      getPaymentHistory();
      getPaymentStatsData();
    }
  };

  const getTotalPayments = () => {
    const kaiaCount = kaiaPayments.length;
    const otherCount = paymentHistory.length;
    return kaiaCount + otherCount;
  };

  const getTotalVolume = () => {
    const kaiaVolume = kaiaStats?.totalVolumeProcessed ? parseFloat(kaiaStats.totalVolumeProcessed) : 0;
    const otherVolume = paymentStats?.totalAmount || 0;
    return kaiaVolume + otherVolume;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Payment System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive payment solutions including QR codes, KAIA blockchain payments, and traditional payment methods
        </p>
      </div>

      {/* Wallet Connection Status */}
      {!wallet.isConnected && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Connect your wallet to access payment features and view transaction history.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      {wallet.isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">KAIA Balance</p>
                  <p className="text-2xl font-bold text-green-600">
                    {kaiaBalance ? formatKaiaAmount(kaiaBalance) : '0.0000'} KAIA
                  </p>
                </div>
                <Coins className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Payments</p>
                  <p className="text-2xl font-bold text-blue-600">{getTotalPayments()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Volume</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${getTotalVolume().toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {kaiaStats?.totalPayments ? `${Math.round((kaiaStats.totalPayments / Math.max(kaiaStats.totalPayments, 1)) * 100)}%` : 'N/A'}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="qr-payments">QR Payments</TabsTrigger>
          <TabsTrigger value="kaia-payments">KAIA Payments</TabsTrigger>
          <TabsTrigger value="payment-history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Payments */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-blue-600" />
                  QR Code Payments
                </CardTitle>
                <CardDescription>
                  Generate QR codes for instant payments to your Line Yield vault
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quick & Easy</span>
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Share payment requests with anyone, anywhere, anytime. Perfect for in-person transactions.
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    onClick={() => setActiveTab('qr-payments')}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Manage QR Payments
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* KAIA Blockchain Payments */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Coins className="w-5 h-5 text-green-600" />
                  KAIA Payments
                </CardTitle>
                <CardDescription>
                  Send secure payments on the KAIA blockchain with automatic fee calculation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Blockchain Secure</span>
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Create secure KAIA payments with automatic fee calculation and transaction tracking.
                  </p>
                  <Button 
                    className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300" 
                    variant="outline"
                    onClick={() => setIsKaiaModalOpen(true)}
                    disabled={!wallet.isConnected}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create KAIA Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          {wallet.isConnected && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Recent Activity
                  </span>
                  <Button variant="outline" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kaiaPayments.slice(0, 3).map((payment) => (
                    <div key={payment.paymentId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Coins className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">KAIA Payment</p>
                          <p className="text-sm text-gray-600">ID: {payment.paymentId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatKaiaAmount(payment.amount)} KAIA</p>
                        <Badge 
                          variant="outline" 
                          className={getKaiaStatusColor(payment.status)}
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {paymentHistory.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.type.toUpperCase()} Payment</p>
                          <p className="text-sm text-gray-600">{payment.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPaymentAmount(payment.amount, payment.currency)}</p>
                        <Badge 
                          variant="outline" 
                          className={getPaymentStatusColor(payment.status)}
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {getTotalPayments() === 0 && (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No payments yet</h3>
                      <p className="text-gray-500">Create your first payment to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* QR Payments Tab */}
        <TabsContent value="qr-payments">
          <QRPayment />
        </TabsContent>

        {/* KAIA Payments Tab */}
        <TabsContent value="kaia-payments">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">KAIA Payments</h2>
                <p className="text-gray-600">Manage your KAIA blockchain payments</p>
              </div>
              <Button onClick={() => setIsKaiaModalOpen(true)} disabled={!wallet.isConnected}>
                <Plus className="w-4 h-4 mr-2" />
                Create Payment
              </Button>
            </div>

            {kaiaError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{kaiaError}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Payments</p>
                      <p className="text-2xl font-bold">{kaiaPayments.length}</p>
                    </div>
                    <Coins className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Volume</p>
                      <p className="text-2xl font-bold">
                        {kaiaStats?.totalVolumeProcessed ? formatKaiaAmount(parseFloat(kaiaStats.totalVolumeProcessed)) : '0.0000'} KAIA
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold">
                        {kaiaStats?.totalPayments ? `${Math.round((kaiaStats.totalPayments / Math.max(kaiaStats.totalPayments, 1)) * 100)}%` : 'N/A'}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* KAIA Payments List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent KAIA Payments</CardTitle>
                <CardDescription>Your latest KAIA blockchain transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {kaiaLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p>Loading payments...</p>
                  </div>
                ) : kaiaPayments.length === 0 ? (
                  <div className="text-center py-8">
                    <Coins className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No KAIA payments yet</h3>
                    <p className="text-gray-500 mb-4">Create your first KAIA payment to get started</p>
                    <Button onClick={() => setIsKaiaModalOpen(true)} disabled={!wallet.isConnected}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Payment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {kaiaPayments.map((payment) => (
                      <div key={payment.paymentId} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Coins className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Payment #{payment.paymentId}</p>
                            <p className="text-sm text-gray-600">{payment.description || 'No description'}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatKaiaAmount(payment.amount)} KAIA</p>
                          <Badge 
                            variant="outline" 
                            className={getKaiaStatusColor(payment.status)}
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="payment-history">
          <PaymentHistory />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Payment Analytics</h2>
              <p className="text-gray-600">Comprehensive insights into your payment activity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Distribution of payment types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-green-600" />
                        <span>KAIA Payments</span>
                      </div>
                      <Badge variant="outline">{kaiaPayments.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span>Traditional Payments</span>
                      </div>
                      <Badge variant="outline">{paymentHistory.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Volume Analysis</CardTitle>
                  <CardDescription>Payment volume breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>KAIA Volume</span>
                      <span className="font-medium">
                        {kaiaStats?.totalVolumeProcessed ? formatKaiaAmount(parseFloat(kaiaStats.totalVolumeProcessed)) : '0.0000'} KAIA
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Traditional Volume</span>
                      <span className="font-medium">
                        ${paymentStats?.totalAmount?.toLocaleString() || '0'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* KAIA Payment Modal */}
      <KaiaPaymentModal
        isOpen={isKaiaModalOpen}
        onClose={() => setIsKaiaModalOpen(false)}
        onSuccess={() => {
          setIsKaiaModalOpen(false);
          handleRefresh();
        }}
      />
    </div>
  );
};

export default Payments;
