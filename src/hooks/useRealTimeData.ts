import { useState, useEffect } from 'react';
import { realTimeDataService, MarketData, YieldData, PortfolioData } from '../services/realTimeDataService';

export const useRealTimeMarketData = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    // Get initial data
    realTimeDataService.getCurrentData<MarketData>('market')
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));

    // Subscribe to real-time updates
    const unsubscribe = realTimeDataService.subscribe<MarketData>('market', setData);

    return unsubscribe;
  }, []);

  return { data, isLoading, error };
};

export const useRealTimeYieldData = () => {
  const [data, setData] = useState<YieldData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    realTimeDataService.getCurrentData<YieldData>('yield')
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));

    const unsubscribe = realTimeDataService.subscribe<YieldData>('yield', setData);

    return unsubscribe;
  }, []);

  return { data, isLoading, error };
};

export const useRealTimePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    realTimeDataService.getCurrentData<PortfolioData>('portfolio')
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));

    const unsubscribe = realTimeDataService.subscribe<PortfolioData>('portfolio', setData);

    return unsubscribe;
  }, []);

  return { data, isLoading, error };
};
