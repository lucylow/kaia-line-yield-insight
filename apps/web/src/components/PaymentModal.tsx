import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { EnhancedModal, EnhancedModalButton, EnhancedModalInput } from '@/components/ui/enhanced-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePayments } from '@/hooks/usePayments';
import { useWallet } from '@/hooks/useWallet';
import { X, CreditCard, Coins, CheckCircle, AlertCircle, Shield, Zap, DollarSign } from 'lucide-react';

// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
  currency?: string;
  description?: string;
  onSuccess?: (payment: any) => void;
}

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  description: string;
  onSuccess: (payment: any) => void;
  onError: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  currency,
  description,
  onSuccess,
  onError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { createStripePayment, confirmStripePayment, isLoading } = usePayments();
  const { wallet } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<any>(null);

  useEffect(() => {
    // Create payment intent when component mounts
    const createIntent = async () => {
      if (wallet.address) {
        const intent = await createStripePayment(amount, currency, {
          description,
          wallet_address: wallet.address
        });
        setPaymentIntent(intent);
      }
    };

    createIntent();
  }, [amount, currency, description, wallet.address, createStripePayment]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !paymentIntent) {
      return;
    }

    setIsProcessing(true);

    try {
      // Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        onError(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Confirm payment on our backend
        const confirmedPayment = await confirmStripePayment(paymentIntent.id);
        onSuccess(confirmedPayment);
      }
    } catch (error) {
      onError(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-element">Card Details</Label>
        <div className="p-3 border border-gray-300 rounded-md">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Amount:</span>
          <span className="text-lg font-bold">
            ${amount.toFixed(2)} {currency.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing || isLoading}
        className="w-full"
      >
        {isProcessing || isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Pay with Card
          </>
        )}
      </Button>
    </form>
  );
};

const CryptoPaymentForm: React.FC<{
  amount: number;
  currency: string;
  description: string;
  onSuccess: (payment: any) => void;
  onError: (error: string) => void;
}> = ({ amount, currency, description, onSuccess, onError }) => {
  const { createCryptoPayment, isLoading } = usePayments();
  const { wallet } = useWallet();
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [selectedNetwork, setSelectedNetwork] = useState<'kaia' | 'ethereum' | 'polygon'>('kaia');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!wallet.address) {
      onError('Please connect your wallet first');
      return;
    }

    setIsProcessing(true);

    try {
      const cryptoPayment = await createCryptoPayment(
        amount.toString(),
        selectedToken,
        wallet.address, // Using wallet address as recipient for demo
        selectedNetwork
      );

      if (cryptoPayment) {
        onSuccess(cryptoPayment);
      }
    } catch (error) {
      onError(`Crypto payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="token">Token</Label>
        <Select value={selectedToken} onValueChange={setSelectedToken}>
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USDC">USDC</SelectItem>
            <SelectItem value="USDT">USDT</SelectItem>
            <SelectItem value="KLAY">KLAY</SelectItem>
            <SelectItem value="ETH">ETH</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="network">Network</Label>
        <Select value={selectedNetwork} onValueChange={(value: any) => setSelectedNetwork(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kaia">KAIA</SelectItem>
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="polygon">Polygon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Amount:</span>
          <span className="text-lg font-bold">
            {amount} {selectedToken}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-xs text-gray-500 mt-2">
          Network: {selectedNetwork.toUpperCase()}
        </p>
      </div>

      <Button
        type="submit"
        disabled={!wallet.isConnected || isProcessing || isLoading}
        className="w-full"
      >
        {isProcessing || isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <Coins className="w-4 h-4 mr-2" />
            Pay with Crypto
          </>
        )}
      </Button>

      {!wallet.isConnected && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please connect your wallet to make crypto payments.
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount = 10,
  currency = 'usd',
  description = 'LINE Yield Deposit',
  onSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'crypto'>('stripe');
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPaymentResult(null);
      setError(null);
    }
  }, [isOpen]);

  const handleSuccess = (payment: any) => {
    setPaymentResult(payment);
    if (onSuccess) {
      onSuccess(payment);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <EnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="Make Payment"
      description="Choose your preferred payment method to complete your transaction"
      status={paymentResult ? 'success' : error ? 'error' : 'idle'}
      statusMessage={error || (paymentResult ? 'Payment completed successfully!' : '')}
    >
      {paymentResult ? (
        <div className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center animate-bounce-in">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-green-600">Payment Successful!</h3>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-gray-700 font-medium">
                Your payment of <span className="font-bold text-green-600">${amount} {currency.toUpperCase()}</span> has been processed.
              </p>
              {paymentResult.txHash && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600">
                    Transaction Hash: <span className="font-mono text-green-600">{paymentResult.txHash.slice(0, 10)}...</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <EnhancedModalButton onClick={onClose} variant="success" size="lg" className="w-full">
            <Shield className="w-4 h-4 mr-2" />
            Complete
          </EnhancedModalButton>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Payment Amount Display */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Amount</p>
                  <p className="text-2xl font-bold text-gray-900">${amount} {currency.toUpperCase()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-sm font-medium text-gray-800">{description}</p>
              </div>
            </div>
          </div>

          <Tabs value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
              <TabsTrigger 
                value="stripe" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <CreditCard className="w-4 h-4" />
                Credit Card
              </TabsTrigger>
              <TabsTrigger 
                value="crypto" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Coins className="w-4 h-4" />
                Crypto
              </TabsTrigger>
            </TabsList>

                <TabsContent value="stripe" className="mt-4">
                  <Elements stripe={stripePromise}>
                    <StripePaymentForm
                      amount={amount}
                      currency={currency}
                      description={description}
                      onSuccess={handleSuccess}
                      onError={handleError}
                    />
                  </Elements>
                </TabsContent>

                <TabsContent value="crypto" className="mt-4">
                  <CryptoPaymentForm
                    amount={amount}
                    currency={currency}
                    description={description}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </EnhancedModal>
  );
};

export default PaymentModal;


