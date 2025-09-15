import React, { useState, useEffect } from 'react';
import { 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Clock,
  Target,
  Zap,
  DollarSign,
  Activity
} from 'lucide-react';
import { kaiaService, TRADE_AND_EARN_CONFIG } from '../services/kaiaService';

interface TradingPair {
  pair: string;
  price: string;
  change24h: number;
  volume24h: string;
  liquidity: string;
  apy: string;
}

interface OrderBookEntry {
  price: string;
  amount: string;
  total: string;
}

interface PriceAlert {
  id: string;
  pair: string;
  targetPrice: string;
  condition: 'above' | 'below';
  isActive: boolean;
}

export const EnhancedTradingInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'spot' | 'limit' | 'alerts' | 'history'>('spot');
  const [selectedPair, setSelectedPair] = useState('USDT/KAIA');
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([]);
  const [orderBook, setOrderBook] = useState<{
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
  }>({ bids: [], asks: [] });
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  // Spot trading form
  const [spotForm, setSpotForm] = useState({
    side: 'buy' as 'buy' | 'sell',
    amount: '',
    slippage: '0.5',
    priceImpact: '0.1',
  });

  // Limit order form
  const [limitForm, setLimitForm] = useState({
    side: 'buy' as 'buy' | 'sell',
    amount: '',
    limitPrice: '',
    expiry: '7d',
  });

  // Price alert form
  const [alertForm, setAlertForm] = useState({
    pair: 'USDT/KAIA',
    targetPrice: '',
    condition: 'above' as 'above' | 'below',
  });

  useEffect(() => {
    loadTradingData();
  }, []);

  const loadTradingData = async () => {
    try {
      // Load trading pairs
      setTradingPairs([
        {
          pair: 'USDT/KAIA',
          price: '0.000123',
          change24h: 2.5,
          volume24h: '125000',
          liquidity: '500000',
          apy: '12.5',
        },
        {
          pair: 'USDT/BTC',
          price: '0.000015',
          change24h: -1.2,
          volume24h: '89000',
          liquidity: '300000',
          apy: '8.3',
        },
        {
          pair: 'USDT/ETH',
          price: '0.000045',
          change24h: 3.8,
          volume24h: '156000',
          liquidity: '750000',
          apy: '15.2',
        },
      ]);

      // Load order book
      setOrderBook({
        bids: [
          { price: '0.000122', amount: '1000', total: '122' },
          { price: '0.000121', amount: '2000', total: '242' },
          { price: '0.000120', amount: '1500', total: '180' },
        ],
        asks: [
          { price: '0.000124', amount: '800', total: '99.2' },
          { price: '0.000125', amount: '1200', total: '150' },
          { price: '0.000126', amount: '900', total: '113.4' },
        ],
      });

      // Load price alerts
      setPriceAlerts([
        {
          id: '1',
          pair: 'USDT/KAIA',
          targetPrice: '0.000130',
          condition: 'above',
          isActive: true,
        },
        {
          id: '2',
          pair: 'USDT/BTC',
          targetPrice: '0.000010',
          condition: 'below',
          isActive: false,
        },
      ]);
    } catch (error) {
      console.error('Failed to load trading data:', error);
    }
  };

  const connectWallet = async () => {
    try {
      const address = await kaiaService.connectWallet();
      setWalletAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const executeSpotTrade = async () => {
    if (!spotForm.amount || !isConnected) return;

    try {
      const tx = await kaiaService.executeTrade(
        selectedPair.split('/')[0],
        selectedPair.split('/')[1],
        spotForm.amount,
        (parseFloat(spotForm.amount) * (1 - parseFloat(spotForm.slippage) / 100)).toString()
      );
      
      await tx.wait();
      await loadTradingData();
      alert('Trade executed successfully!');
    } catch (error) {
      console.error('Trade execution failed:', error);
      alert('Trade execution failed. Please try again.');
    }
  };

  const createPriceAlert = () => {
    if (!alertForm.targetPrice) return;

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      pair: alertForm.pair,
      targetPrice: alertForm.targetPrice,
      condition: alertForm.condition,
      isActive: true,
    };

    setPriceAlerts([...priceAlerts, newAlert]);
    setAlertForm({ pair: 'USDT/KAIA', targetPrice: '', condition: 'above' });
    alert('Price alert created successfully!');
  };

  const toggleAlert = (alertId: string) => {
    setPriceAlerts(alerts =>
      alerts.map(alert =>
        alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const deleteAlert = (alertId: string) => {
    setPriceAlerts(alerts => alerts.filter(alert => alert.id !== alertId));
  };

  const selectedPairData = tradingPairs.find(pair => pair.pair === selectedPair);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Enhanced Trading Interface
        </h1>
        <p className="text-gray-600">
          Advanced trading with price alerts, limit orders, and real-time data
        </p>
      </div>

      {/* Connection Status */}
      {!isConnected ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-blue-700 mb-4">
            Connect your wallet to access advanced trading features
          </p>
          <button
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-800 font-medium">
                Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
            <button
              onClick={() => {
                setIsConnected(false);
                setWalletAddress('');
              }}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* Trading Pairs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Trading Pairs</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tradingPairs.map((pair, index) => (
              <div
                key={index}
                onClick={() => setSelectedPair(pair.pair)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedPair === pair.pair
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{pair.pair}</p>
                    <p className="text-sm text-gray-600">Volume: ${pair.volume24h}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${pair.price}</p>
                    <div className={`flex items-center text-sm ${
                      pair.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {pair.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(pair.change24h)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('spot')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'spot'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowUpDown className="w-4 h-4 inline mr-2" />
          Spot Trading
        </button>
        <button
          onClick={() => setActiveTab('limit')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'limit'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Limit Orders
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'alerts'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target className="w-4 h-4 inline mr-2" />
          Price Alerts
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'history'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Activity className="w-4 h-4 inline mr-2" />
          Trade History
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spot Trading */}
          {activeTab === 'spot' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Spot Trading</h3>
                <p className="text-gray-600">Trade {selectedPair} with {TRADE_AND_EARN_CONFIG.rewardMultiplier}x rewards</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSpotForm({ ...spotForm, side: 'buy' })}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      spotForm.side === 'buy'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Buy {selectedPair.split('/')[1]}
                  </button>
                  <button
                    onClick={() => setSpotForm({ ...spotForm, side: 'sell' })}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      spotForm.side === 'sell'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sell {selectedPair.split('/')[1]}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ({selectedPair.split('/')[0]})
                  </label>
                  <input
                    type="number"
                    value={spotForm.amount}
                    onChange={(e) => setSpotForm({ ...spotForm, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slippage Tolerance
                  </label>
                  <select
                    value={spotForm.slippage}
                    onChange={(e) => setSpotForm({ ...spotForm, slippage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="0.1">0.1%</option>
                    <option value="0.5">0.5%</option>
                    <option value="1.0">1.0%</option>
                    <option value="2.0">2.0%</option>
                  </select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Price Impact</p>
                      <p className="text-sm text-yellow-700">{spotForm.priceImpact}%</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={executeSpotTrade}
                  disabled={!spotForm.amount || !isConnected}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {spotForm.side === 'buy' ? 'Buy' : 'Sell'} {selectedPair.split('/')[1]}
                </button>
              </div>
            </div>
          )}

          {/* Limit Orders */}
          {activeTab === 'limit' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Limit Orders</h3>
                <p className="text-gray-600">Set custom prices for your trades</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setLimitForm({ ...limitForm, side: 'buy' })}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      limitForm.side === 'buy'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Buy Limit
                  </button>
                  <button
                    onClick={() => setLimitForm({ ...limitForm, side: 'sell' })}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      limitForm.side === 'sell'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sell Limit
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ({selectedPair.split('/')[0]})
                  </label>
                  <input
                    type="number"
                    value={limitForm.amount}
                    onChange={(e) => setLimitForm({ ...limitForm, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Limit Price ({selectedPair.split('/')[1]})
                  </label>
                  <input
                    type="number"
                    value={limitForm.limitPrice}
                    onChange={(e) => setLimitForm({ ...limitForm, limitPrice: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry
                  </label>
                  <select
                    value={limitForm.expiry}
                    onChange={(e) => setLimitForm({ ...limitForm, expiry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1d">1 Day</option>
                    <option value="7d">7 Days</option>
                    <option value="30d">30 Days</option>
                    <option value="90d">90 Days</option>
                  </select>
                </div>

                <button
                  disabled={!limitForm.amount || !limitForm.limitPrice || !isConnected}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Place Limit Order
                </button>
              </div>
            </div>
          )}

          {/* Price Alerts */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              {/* Create Alert */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Create Price Alert</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trading Pair
                    </label>
                    <select
                      value={alertForm.pair}
                      onChange={(e) => setAlertForm({ ...alertForm, pair: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {tradingPairs.map((pair, index) => (
                        <option key={index} value={pair.pair}>{pair.pair}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Price
                    </label>
                    <input
                      type="number"
                      value={alertForm.targetPrice}
                      onChange={(e) => setAlertForm({ ...alertForm, targetPrice: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setAlertForm({ ...alertForm, condition: 'above' })}
                        className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                          alertForm.condition === 'above'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Price Above
                      </button>
                      <button
                        onClick={() => setAlertForm({ ...alertForm, condition: 'below' })}
                        className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                          alertForm.condition === 'below'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Price Below
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={createPriceAlert}
                    disabled={!alertForm.targetPrice}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Create Alert
                  </button>
                </div>
              </div>

              {/* Active Alerts */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {priceAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            alert.isActive ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                          <div>
                            <p className="font-semibold text-gray-900">{alert.pair}</p>
                            <p className="text-sm text-gray-600">
                              {alert.condition === 'above' ? 'Above' : 'Below'} ${alert.targetPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleAlert(alert.id)}
                            className={`px-3 py-1 text-sm rounded transition-colors ${
                              alert.isActive
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {alert.isActive ? 'Pause' : 'Activate'}
                          </button>
                          <button
                            onClick={() => deleteAlert(alert.id)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trade History */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Trade History</h3>
              </div>
              <div className="p-6">
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No trades yet. Start trading to see your history here.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Book */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Order Book</h3>
              <p className="text-gray-600">{selectedPair}</p>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 mb-2">
                  <span>Price</span>
                  <span>Amount</span>
                  <span>Total</span>
                </div>
                
                {/* Asks (Sell Orders) */}
                {orderBook.asks.map((ask, index) => (
                  <div key={`ask-${index}`} className="grid grid-cols-3 gap-4 text-sm">
                    <span className="text-red-600">{ask.price}</span>
                    <span className="text-gray-900">{ask.amount}</span>
                    <span className="text-gray-900">{ask.total}</span>
                  </div>
                ))}
                
                {/* Spread */}
                <div className="border-t border-gray-200 my-2"></div>
                <div className="text-center text-sm text-gray-500 py-2">
                  Spread: {selectedPairData?.price || '0.000123'}
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                
                {/* Bids (Buy Orders) */}
                {orderBook.bids.map((bid, index) => (
                  <div key={`bid-${index}`} className="grid grid-cols-3 gap-4 text-sm">
                    <span className="text-green-600">{bid.price}</span>
                    <span className="text-gray-900">{bid.amount}</span>
                    <span className="text-gray-900">{bid.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Market Stats</h3>
            </div>
            <div className="p-6 space-y-4">
              {selectedPairData && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">24h Volume</span>
                    <span className="font-semibold">${selectedPairData.volume24h}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Liquidity</span>
                    <span className="font-semibold">${selectedPairData.liquidity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">APY</span>
                    <span className="font-semibold text-green-600">{selectedPairData.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">24h Change</span>
                    <span className={`font-semibold ${
                      selectedPairData.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedPairData.change24h >= 0 ? '+' : ''}{selectedPairData.change24h}%
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTradingInterface;
