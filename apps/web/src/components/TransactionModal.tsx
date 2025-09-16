import React, { useState } from 'react';
import { EnhancedModal, EnhancedModalButton, EnhancedModalInput } from './ui/enhanced-modal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ProgressIndicator } from './ProgressIndicator';
import { useWallet } from '../providers/SimpleWalletProvider';
import { formatCurrency } from '../utils/formatters';
import { ArrowUpRight, ArrowDownLeft, Info, Zap, CheckCircle, Clock, Shield, TrendingUp, DollarSign, TrendingDown, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface Step {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
  onSubmit: (amount: string) => Promise<any>;
  maxAmount: string;
  isLoading: boolean;
  currentApy?: number;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  onSubmit,
  maxAmount,
  isLoading,
  currentApy = 0.085,
}) => {
  const [amount, setAmount] = useState('');
  const [transactionStep, setTransactionStep] = useState<'input' | 'processing' | 'success'>('input');
  const { isConnected } = useWallet();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    try {
      setTransactionStep('processing');
      await onSubmit(amount);
      setTransactionStep('success');
      
      // Show success for 2 seconds then close
      setTimeout(() => {
        setAmount('');
        setTransactionStep('input');
        onClose();
      }, 2000);
      
      toast({
        title: `${type === 'deposit' ? 'Deposit' : 'Withdrawal'} Successful`,
        description: `Transaction submitted successfully. Gas fees sponsored!`,
      });
    } catch (error) {
      console.error(`${type} failed:`, error);
      setTransactionStep('input');
      toast({
        title: `${type === 'deposit' ? 'Deposit' : 'Withdrawal'} Failed`,
        description: "Please try again or contact support",
        variant: "destructive",
      });
    }
  };

  const setMaxAmount = () => {
    setAmount(maxAmount);
  };

  const isDeposit = type === 'deposit';
  const Icon = isDeposit ? ArrowUpRight : ArrowDownLeft;
  const projectedYield = parseFloat(amount || '0') * currentApy;

  const transactionSteps: Step[] = [
    {
      id: 'input',
      title: 'Enter Amount',
      description: 'Specify the amount to process',
      status: transactionStep === 'input' ? 'current' : 'completed'
    },
    {
      id: 'processing',
      title: 'Processing Transaction',
      description: 'Confirming transaction on blockchain',
      status: transactionStep === 'processing' ? 'current' : 
              transactionStep === 'success' ? 'completed' : 'pending'
    },
    {
      id: 'success',
      title: 'Transaction Complete',
      description: 'Your transaction has been confirmed',
      status: transactionStep === 'success' ? 'current' : 'pending'
    }
  ];

  return (
    <EnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={isDeposit ? 'Deposit USDT' : 'Withdraw USDT'}
      description={isDeposit ? 'Start earning yield today' : 'Access your funds anytime'}
      status={transactionStep === 'processing' ? 'loading' : transactionStep === 'success' ? 'success' : 'idle'}
      statusMessage={
        transactionStep === 'processing' ? 'Processing transaction...' :
        transactionStep === 'success' ? 'Transaction completed successfully!' : ''
      }
      className="max-h-[90vh] overflow-hidden"
    >
      <div className="space-y-6">
        {/* Transaction Icon */}
        <div className="text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 ${
            isDeposit ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-orange-500 to-red-500'
          }`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isDeposit ? 'Deposit Funds' : 'Withdraw Funds'}
          </h3>
          <p className="text-sm text-gray-600">
            {isDeposit ? 'Add USDT to start earning yield' : 'Withdraw your USDT anytime'}
          </p>
        </div>

        {transactionStep === 'input' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-4">
              <EnhancedModalInput
                label={`Amount to ${isDeposit ? 'Deposit' : 'Withdraw'}`}
                type="number"
                value={amount}
                onChange={setAmount}
                placeholder="0.00"
                icon={<DollarSign className="w-4 h-4" />}
                className="text-xl h-14 font-semibold"
              />
              
              {/* Balance Display */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      {isDeposit ? 'Wallet Balance' : 'Available Balance'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${formatCurrency(parseFloat(maxAmount))} USDT
                    </span>
                    <EnhancedModalButton
                      variant="secondary"
                      size="sm"
                      onClick={setMaxAmount}
                    >
                      Max
                    </EnhancedModalButton>
                  </div>
                </div>
              </div>
            </div>
            {/* Transaction Details */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 space-y-4 border border-blue-200">
              <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                <Info className="w-5 h-5 text-blue-600" />
                Transaction Details
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-white/80 rounded-xl border border-white/50 shadow-sm">
                  <span className="text-gray-700 font-medium">Current APY</span>
                  <span className="font-bold text-lg text-blue-600">{(currentApy * 100).toFixed(2)}%</span>
                </div>
                
                {isDeposit && amount && (
                  <div className="flex justify-between items-center p-4 bg-white/80 rounded-xl border border-white/50 shadow-sm">
                    <span className="text-gray-700 font-medium">Projected yearly yield</span>
                    <span className="font-bold text-green-600 text-lg">
                      +${formatCurrency(projectedYield)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center p-4 bg-white/80 rounded-xl border border-white/50 shadow-sm">
                  <span className="text-gray-700 font-medium">Gas Fee</span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-green-600">Free (Sponsored)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 text-base font-semibold rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <EnhancedModalButton
                disabled={!amount || parseFloat(amount) <= 0 || isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {isDeposit ? (
                      <>
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Deposit USDT
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-5 h-5 mr-2" />
                        Withdraw USDT
                      </>
                    )}
                  </>
                )}
              </EnhancedModalButton>
            </div>
            </form>
          )}

          {transactionStep === 'processing' && (
            <div className="space-y-6 mt-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-10 h-10 text-green-600 animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Processing Your Transaction
                </h3>
                <p className="text-gray-600">
                  Please wait while we confirm your {isDeposit ? 'deposit' : 'withdrawal'} on the blockchain
                </p>
              </div>
              
              <ProgressIndicator steps={transactionSteps} currentStep={1} />
            </div>
          )}

          {transactionStep === 'success' && (
            <div className="space-y-6 mt-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-in">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Transaction Successful!
                </h3>
                <p className="text-gray-600">
                  Your {isDeposit ? 'deposit' : 'withdrawal'} of {amount} USDT has been confirmed
                </p>
              </div>
              
              <ProgressIndicator steps={transactionSteps} currentStep={2} />
            </div>
          )}
        </div>
      </EnhancedModal>
    );
  };