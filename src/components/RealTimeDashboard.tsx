import React, { useState, useEffect } from 'react';
import { useMarketData, useYieldUpdates, useSystemStatus } from '../hooks/useWebSocket';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/badge';
import { Button } from './ui/Button';
import { RefreshCw, TrendingUp, TrendingDown, Users, DollarSign, Activity } from 'lucide-react';

interface MarketData {
  usdt: {
    price: number;
    change24h: number;
    volume24h: number;
  };
  kaia: {
    price: number;
    change24h: number;
    volume24h: number;
  };
  totalValueLocked: number;
  activeUsers: number;
  timestamp: number;
}

interface YieldData {
  strategies: Array<{
    name: string;
    apy: number;
    tvl: number;
    risk: string;
  }>;
  timestamp: number;
}

interface SystemStatus {
  status: string;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  connections: number;
  timestamp: number;
}

export const RealTimeDashboard: React.FC = () => {
  const marketData = useMarketData();
  const yieldData = useYieldUpdates();
  const systemStatus = useSystemStatus();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    if (marketData.channelData || yieldData.channelData || systemStatus.channelData) {
      setLastUpdate(new Date());
    }
  }, [marketData.channelData, yieldData.channelData, systemStatus.channelData]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(2);
  };

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatPercentage = (num: number): string => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatMemory = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getRiskColor = (risk: string): string => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const marketInfo: MarketData | null = marketData.channelData;
  const yieldInfo: YieldData | null = yieldData.channelData;
  const systemInfo: SystemStatus | null = systemStatus.channelData;

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              marketData.isConnected ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-sm font-medium">
              {marketData.isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={marketData.reconnect}
            disabled={marketData.isConnected}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reconnect
          </Button>
        </div>
      </div>

      {/* Market Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">USDT Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketInfo ? formatCurrency(marketInfo.usdt.price) : '$1.00'}
            </div>
            <div className={`text-xs flex items-center ${
              marketInfo && marketInfo.usdt.change24h >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {marketInfo && marketInfo.usdt.change24h >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {marketInfo ? formatPercentage(marketInfo.usdt.change24h * 100) : '+0.00%'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kaia Price</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketInfo ? formatCurrency(marketInfo.kaia.price) : '$0.25'}
            </div>
            <div className={`text-xs flex items-center ${
              marketInfo && marketInfo.kaia.change24h >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {marketInfo && marketInfo.kaia.change24h >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {marketInfo ? formatPercentage(marketInfo.kaia.change24h * 100) : '+0.00%'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketInfo ? formatCurrency(marketInfo.totalValueLocked) : '$2.5M'}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all strategies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {marketInfo ? formatNumber(marketInfo.activeUsers) : '1.2K'}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently online
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Yield Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Yield Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {yieldInfo?.strategies.map((strategy, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{strategy.name}</h3>
                  <Badge className={getRiskColor(strategy.risk)}>
                    {strategy.risk}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">APY</span>
                    <span className="font-semibold text-green-600">
                      {strategy.apy.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">TVL</span>
                    <span className="font-semibold">
                      {formatCurrency(strategy.tvl)}
                    </span>
                  </div>
                </div>
              </div>
            )) || (
              // Fallback data
              <>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">USDT Stable Pool</h3>
                    <Badge className="bg-green-100 text-green-800">Low</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">APY</span>
                      <span className="font-semibold text-green-600">8.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">TVL</span>
                      <span className="font-semibold">$1.2M</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Kaia Liquidity Mining</h3>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">APY</span>
                      <span className="font-semibold text-green-600">12.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">TVL</span>
                      <span className="font-semibold">$800K</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">NFT Collateral Pool</h3>
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">APY</span>
                      <span className="font-semibold text-green-600">15.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">TVL</span>
                      <span className="font-semibold">$500K</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {systemInfo?.status === 'healthy' ? '✓' : '⚠'}
              </div>
              <div className="text-sm text-gray-600">Status</div>
              <div className="text-sm font-medium">
                {systemInfo?.status || 'Healthy'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {systemInfo ? formatUptime(systemInfo.uptime) : '0m'}
              </div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {systemInfo ? formatMemory(systemInfo.memory.heapUsed) : '0 MB'}
              </div>
              <div className="text-sm text-gray-600">Memory Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {systemInfo?.connections || 0}
              </div>
              <div className="text-sm text-gray-600">Connections</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {(marketData.error || yieldData.error || systemStatus.error) && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-800">
              <h3 className="font-medium mb-2">Connection Issues</h3>
              <ul className="text-sm space-y-1">
                {marketData.error && <li>Market Data: {marketData.error}</li>}
                {yieldData.error && <li>Yield Data: {yieldData.error}</li>}
                {systemStatus.error && <li>System Status: {systemStatus.error}</li>}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
