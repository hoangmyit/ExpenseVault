import { DateTime } from 'luxon';

export const formatDate = (date: string | Date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';

  const dateObj =
    typeof date === 'string'
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);

  return dateObj.isValid ? dateObj.toFormat(formatStr) : '';
};
