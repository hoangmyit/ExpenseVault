import { isNumber } from './type-utils';

/**
 * Formats a number as currency
 * @param {number} value - Number to format
 * @param {string} [locale='en-US'] - Locale for formatting
 * @param {string} [currency='USD'] - Currency code
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (
  value: number,
  locale: string = 'en-US',
  currency: string = 'USD',
): string => {
  if (!isNumber(value)) return '';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};
