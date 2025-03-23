import { isEmpty, isNil } from 'ramda';

/**
 * Checks if a value is null, undefined, or empty
 * @param {unknown[] | null | undefined | unknown} value - Value to check
 * @returns {boolean} - True if value is null, undefined, or empty
 */
export const isNullOrEmpty = (
  value: unknown[] | null | undefined | unknown,
): boolean => isNil(value) || isEmpty(value);

/**
 * Checks if a value is a number
 * @param {unknown} value - Value to check
 * @returns {boolean} - True if value is a number
 */
export const isNumber = (value: unknown): boolean =>
  typeof value === 'number' && !isNaN(value) && isFinite(value);

/**
 * Checks if a value is a string
 * @param {unknown} value - Value to check
 * @returns {boolean} - True if value is a string
 */
export const isString = (value: unknown): boolean => typeof value === 'string';

/**
 * Checks if a value is a boolean
 * @param {unknown} value - Value to check
 * @returns {boolean} - True if value is a boolean
 */
export const isBoolean = (value: unknown): boolean =>
  typeof value === 'boolean';

/**
 * Checks if a value is an object (excluding null)
 * @param {unknown} value - Value to check
 * @returns {boolean} - True if value is an object
 */
export const isObject = (value: unknown): boolean =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Checks if a value is an array
 * @param {unknown} value - Value to check
 * @returns {boolean} - True if value is an array
 */
export const isArray = (value: unknown): boolean => Array.isArray(value);

/**
 * Checks if a value is a function
 * @param {unknown} value - Value to check
 * @returns {boolean} - True if value is a function
 */
export const isFunction = (value: unknown): boolean =>
  typeof value === 'function';

/**
 * Checks if a value is null or undefined
 * @param {unknown} value - Value to check
 * @returns {boolean} - True if value is null or undefined
 */
export const isNullOrUndefined = (value: unknown): boolean => isNil(value);

/**
 * Fixes number precision to specified decimal places
 * @param {number} value - Number to fix precision
 * @param {number} [precision=2] - Number of decimal places
 * @returns {number} - Number with fixed precision
 */
export const fixPrecision = (value: number, precision: number = 2): number => {
  if (!isNumber(value)) return NaN;
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

/**
 * Clamps a number between min and max values
 * @param {number} value - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped number
 */
export const clamp = (value: number, min: number, max: number): number => {
  if (!isNumber(value) || !isNumber(min) || !isNumber(max)) return NaN;
  return Math.min(Math.max(value, min), max);
};

/**
 * Safely parses a string to number, returning NaN for invalid input
 * @param {string} value - String to parse
 * @returns {number} - Parsed number or NaN
 */
export const parseNumber = (value: string): number => {
  if (!isString(value)) return NaN;
  const parsed = Number(value);
  return isNumber(parsed) ? parsed : NaN;
};

/**
 * Checks if a value is a date object
 * @param {unknown} value - Value to check
 * @returns {boolean} - True if value is a date object
 */
export const isDate = (value: unknown): boolean =>
  value instanceof Date && !isNaN(value.getTime());

/**
 * Provides a default value if the input is null or undefined
 * @template T - Type of the value
 * @param {T | null | undefined} value - Value to check
 * @param {T} defaultValue - Default value to return if value is null or undefined
 * @returns {T} - Original value or default value
 */
export const defaultIfNil = <T>(
  value: T | null | undefined,
  defaultValue: T,
): T => (isNil(value) ? defaultValue : value);
