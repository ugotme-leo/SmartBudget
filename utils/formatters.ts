import { AppSettings } from '../types';

export const formatCurrency = (amount: number, settings: AppSettings): string => {
  // Use a standard space for consistent formatting
  const space = ' ';
  const formattedAmount = amount.toLocaleString();
  
  if (settings.currencyPosition === 'before') {
    return `${settings.currencySymbol}${space}${formattedAmount}`;
  }
  
  return `${formattedAmount}${space}${settings.currencySymbol}`;
};
