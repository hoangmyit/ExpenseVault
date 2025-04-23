import { DateTime, DiffOptions, DurationLike, DurationUnits } from 'luxon';

export const formatDate = (date: string | Date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';

  const dateObj =
    typeof date === 'string'
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);

  return dateObj.isValid ? dateObj.toFormat(formatStr) : '';
};

export const dateAdd = (date: DateTime, timeAdd: DurationLike) =>
  date.plus(timeAdd);

export const getDateTimeNow = () => DateTime.now();

export const dateDiff = (
  startDate: DateTime,
  endDate: DateTime,
  unit?: DurationUnits,
  opts?: DiffOptions,
) => endDate.diff(startDate, unit, opts).toObject();
