import { useState, useEffect } from 'react';

interface YieldData {
  totalDeposited: string;
  totalEarned: string;
  currentAPY: string;
  activeStrategies: number;
}

export const useYieldData = () => {
  const [data, setData] = useState<YieldData>({
    totalDeposited: '0',
    totalEarned: '0',
    currentAPY: '0',
    activeStrategies: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setData({
          totalDeposited: '5000.00',
          totalEarned: '125.50',
          currentAPY: '8.5',
          activeStrategies: 3
        });
      } catch (error) {
        console.error('Failed to fetch yield data:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading };
};
