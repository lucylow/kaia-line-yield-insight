export const formatCurrency = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatBalance = (balance: string | number, decimals: number = 4): string => {
  const numericBalance = typeof balance === 'string' ? parseFloat(balance) : balance;
  return formatCurrency(numericBalance, decimals);
};

export const truncateAddress = (address: string, start: number = 6, end: number = 4): string => {
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

export const formatApy = (apy: number): string => {
  return `${(apy * 100).toFixed(2)}%`;
};