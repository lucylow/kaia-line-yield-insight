// Real-time data service for LINE Yield Platform
export interface MarketData {
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdated: Date;
}

export interface YieldData {
  apy: number;
  tvl: number;
  activeUsers: number;
  totalRewards: number;
  lastUpdated: Date;
}

export interface PortfolioData {
  totalValue: number;
  totalDeposited: number;
  totalEarned: number;
  activeStrategies: number;
  portfolioHealth: number;
  lastUpdated: Date;
}

class RealTimeDataService {
  private subscribers: Map<string, Set<(data: any) => void>> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  // Subscribe to real-time data updates
  subscribe<T>(dataType: string, callback: (data: T) => void): () => void {
    if (!this.subscribers.has(dataType)) {
      this.subscribers.set(dataType, new Set());
    }
    
    this.subscribers.get(dataType)!.add(callback);
    
    // Start data fetching if this is the first subscriber
    if (this.subscribers.get(dataType)!.size === 1) {
      this.startDataFetching(dataType);
    }

    // Return unsubscribe function
    return () => {
      const subscribers = this.subscribers.get(dataType);
      if (subscribers) {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          this.stopDataFetching(dataType);
        }
      }
    };
  }

  // Start fetching data for a specific type
  private startDataFetching(dataType: string) {
    const interval = setInterval(() => {
      this.fetchData(dataType);
    }, 5000); // Update every 5 seconds

    this.intervals.set(dataType, interval);
    
    // Fetch initial data
    this.fetchData(dataType);
  }

  // Stop fetching data for a specific type
  private stopDataFetching(dataType: string) {
    const interval = this.intervals.get(dataType);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(dataType);
    }
  }

  // Fetch data based on type
  private async fetchData(dataType: string) {
    try {
      let data: any;
      
      switch (dataType) {
        case 'market':
          data = await this.fetchMarketData();
          break;
        case 'yield':
          data = await this.fetchYieldData();
          break;
        case 'portfolio':
          data = await this.fetchPortfolioData();
          break;
        default:
          return;
      }

      // Notify subscribers
      const subscribers = this.subscribers.get(dataType);
      if (subscribers) {
        subscribers.forEach(callback => callback(data));
      }
    } catch (error) {
      console.error(`Error fetching ${dataType} data:`, error);
    }
  }

  // Fetch market data (simulated)
  private async fetchMarketData(): Promise<MarketData> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      price: 1.0 + (Math.random() - 0.5) * 0.02, // USDT price with small variations
      change24h: (Math.random() - 0.5) * 2, // -1% to +1% change
      volume24h: 2500000 + Math.random() * 500000, // $2.5M - $3M volume
      marketCap: 1000000000 + Math.random() * 100000000, // $1B - $1.1B market cap
      lastUpdated: new Date()
    };
  }

  // Fetch yield data (simulated)
  private async fetchYieldData(): Promise<YieldData> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      apy: 8.5 + (Math.random() - 0.5) * 2, // 7.5% - 9.5% APY
      tvl: 2400000 + Math.random() * 200000, // $2.4M - $2.6M TVL
      activeUsers: 1247 + Math.floor(Math.random() * 50), // 1247 - 1297 users
      totalRewards: 125000 + Math.random() * 10000, // $125K - $135K rewards
      lastUpdated: new Date()
    };
  }

  // Fetch portfolio data (simulated)
  private async fetchPortfolioData(): Promise<PortfolioData> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      totalValue: 5000 + Math.random() * 500, // $5000 - $5500
      totalDeposited: 5000,
      totalEarned: 125.5 + Math.random() * 10, // $125.5 - $135.5
      activeStrategies: 3,
      portfolioHealth: 85 + Math.floor(Math.random() * 10), // 85% - 95%
      lastUpdated: new Date()
    };
  }

  // Get current data without subscribing
  async getCurrentData<T>(dataType: string): Promise<T> {
    switch (dataType) {
      case 'market':
        return this.fetchMarketData() as T;
      case 'yield':
        return this.fetchYieldData() as T;
      case 'portfolio':
        return this.fetchPortfolioData() as T;
      default:
        throw new Error(`Unknown data type: ${dataType}`);
    }
  }

  // Cleanup all subscriptions and intervals
  cleanup() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    this.subscribers.clear();
  }
}

// Export singleton instance
export const realTimeDataService = new RealTimeDataService();
