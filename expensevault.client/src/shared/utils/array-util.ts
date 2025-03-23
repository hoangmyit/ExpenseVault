import {
  addIndex,
  all,
  any,
  concat,
  difference,
  filter,
  find,
  flatten,
  forEach,
  groupBy,
  head,
  includes,
  intersection,
  last,
  length,
  map,
  reduce,
  slice,
  sort,
  sum,
  uniq,
  without,
} from 'ramda';

/**
 * Maps each element of an array using the provided function with index support
 * @template T - Type of elements in the input array
 * @template U - Type of elements in the output array
 * @param {T[]} arr - Input array
 * @param {(item: T, index?: number, arr?: T[]) => U} fn - Mapping function
 * @returns {U[]} - Mapped array
 */
export const mapArray = <T, U>(
  arr: T[],
  fn: (item: T, index?: number, arr?: T[]) => U,
): U[] =>
  addIndex(map)((item, idx, list) => fn(item as T, idx, list as T[]), arr);

/**
 * Filters elements of an array using the provided predicate function
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {(item: T) => boolean} fn - Predicate function
 * @returns {T[]} - Filtered array
 */
export const filterArray = <T>(arr: T[], fn: (item: T) => boolean): T[] =>
  filter(fn, arr);

/**
 * Finds the first element in an array that satisfies the provided function
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {(item: T) => boolean} fn - Predicate function
 * @returns {T | undefined} - Found element or undefined if not found
 */
export const findArray = <T>(
  arr: T[],
  fn: (item: T) => boolean,
): T | undefined => find(fn, arr);

/**
 * Gets the length of an array
 * @param {unknown[]} arr - Array to get length of
 * @returns {number} - Length of the array
 */
export const getArrayLength = (arr: unknown[]): number => length(arr);

/**
 * Executes a provided function once for each array element with index support
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {(item: T, index?: number, arr?: T[]) => void} fn - Function to execute
 * @returns {T[]} - The original array (for chaining)
 */
export const forEachArray = <T>(
  arr: T[],
  fn: (item: T, index?: number, arr?: T[]) => void,
): T[] => {
  addIndex(forEach)(
    fn as (item: unknown, index: number, arr: unknown[]) => void,
    arr,
  );
  return arr;
};

/**
 * Gets the first element of an array
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @returns {T | undefined} - First element or undefined if array is empty
 */
export const firstArray = <T>(arr: T[]): T | undefined => head(arr);

/**
 * Gets the last element of an array
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @returns {T | undefined} - Last element or undefined if array is empty
 */
export const lastArray = <T>(arr: T[]): T | undefined => last(arr);

/**
 * Creates a new array with unique elements from the input array
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @returns {T[]} - Array with unique elements
 */
export const uniqueArray = <T>(arr: T[]): T[] => uniq(arr);

/**
 * Sorts an array using the provided compare function or default comparison
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {(a: T, b: T) => number} [compareFn] - Optional comparison function
 * @returns {T[]} - Sorted array
 */
export const sortArray = <T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number,
): T[] =>
  compareFn ? sort(compareFn, arr) : sort((a, b) => (a > b ? 1 : -1), arr);

/**
 * Flattens a nested array structure
 * @template T - Type of elements in the array
 * @param {T[][]} arr - Nested array
 * @returns {T[]} - Flattened array
 */
export const flattenArray = <T>(arr: T[][]): T[] => Array.from(flatten(arr));

/**
 * Groups array elements by a key function
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {(item: T) => string} fn - Key function for grouping
 * @returns {Record<string, T[]>} - Object with groups of elements
 */
export const groupArray = <T>(
  arr: T[],
  fn: (item: T) => string,
): Record<string, T[]> => {
  const grouped = groupBy(fn, arr);
  return Object.keys(grouped).reduce(
    (acc, key) => {
      acc[key] = grouped[key] || [];
      return acc;
    },
    {} as Record<string, T[]>,
  );
};

/**
 * Reduces array to a single value
 * @template T - Type of elements in the array
 * @template R - Type of the accumulated result
 * @param {T[]} arr - Input array
 * @param {(acc: R, item: T) => R} fn - Reducer function
 * @param {R} initial - Initial value
 * @returns {R} - Accumulated result
 */
export const reduceArray = <T, R>(
  arr: T[],
  fn: (acc: R, item: T) => R,
  initial: R,
): R => reduce(fn, initial, arr);

/**
 * Checks if an array includes a specific value
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {T} value - Value to check for
 * @returns {boolean} - True if the value exists in the array
 */
export const includesArray = <T>(arr: T[], value: T): boolean =>
  includes(value, arr);

/**
 * Sums all numbers in an array
 * @param {number[]} arr - Array of numbers
 * @returns {number} - Sum of all numbers
 */
export const sumArray = (arr: number[]): number => sum(arr);

/**
 * Checks if any element in the array satisfies the predicate
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {(item: T) => boolean} fn - Predicate function
 * @returns {boolean} - True if any element satisfies the predicate
 */
export const anyArray = <T>(arr: T[], fn: (item: T) => boolean): boolean =>
  any(fn, arr);

/**
 * Checks if all elements in the array satisfy the predicate
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {(item: T) => boolean} fn - Predicate function
 * @returns {boolean} - True if all elements satisfy the predicate
 */
export const allArray = <T>(arr: T[], fn: (item: T) => boolean): boolean =>
  all(fn, arr);

/**
 * Concatenates two arrays
 * @template T - Type of elements in the arrays
 * @param {T[]} arr1 - First array
 * @param {T[]} arr2 - Second array
 * @returns {T[]} - Concatenated array
 */
export const concatArray = <T>(arr1: T[], arr2: T[]): T[] => concat(arr1, arr2);

/**
 * Gets elements that are in the first array but not in the second
 * @template T - Type of elements in the arrays
 * @param {T[]} arr1 - First array
 * @param {T[]} arr2 - Second array
 * @returns {T[]} - Array with elements unique to the first array
 */
export const diffArray = <T>(arr1: T[], arr2: T[]): T[] =>
  difference(arr1, arr2);

/**
 * Gets elements that exist in both arrays
 * @template T - Type of elements in the arrays
 * @param {T[]} arr1 - First array
 * @param {T[]} arr2 - Second array
 * @returns {T[]} - Array with common elements
 */
export const intersectArray = <T>(arr1: T[], arr2: T[]): T[] =>
  intersection(arr1, arr2);

/**
 * Creates a slice of array from start up to, but not including, end
 * @template T - Type of elements in the array
 * @param {number} start - The start index
 * @param {number} end - The end index
 * @param {T[]} arr - Input array
 * @returns {T[]} - Sliced array
 */
export const sliceArray = <T>(start: number, end: number, arr: T[]): T[] =>
  slice(start, end, arr);

/**
 * Removes specified values from an array
 * @template T - Type of elements in the array
 * @param {T[]} valuesToRemove - Values to remove
 * @param {T[]} arr - Input array
 * @returns {T[]} - Array with values removed
 */
export const removeArray = <T>(valuesToRemove: T[], arr: T[]): T[] =>
  without(valuesToRemove, arr);

/**
 * Chunks an array into smaller arrays of specified size
 * @template T - Type of elements in the array
 * @param {number} size - Size of each chunk
 * @param {T[]} arr - Input array
 * @returns {T[][]} - Array of chunks
 */
export const chunkArray = <T>(size: number, arr: T[]): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

/**
 * Creates an array of numbers from start to end (exclusive)
 * @param {number} start - Start number
 * @param {number} end - End number (exclusive)
 * @returns {number[]} - Range array
 */
export const rangeArray = (start: number, end: number): number[] => {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

/**
 * Randomly shuffles array elements
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @returns {T[]} - Shuffled array
 */
export const shuffleArray = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Adds one or more elements to the end of an array and returns a new array
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {T[]} elements - Elements to add
 * @returns {T[]} - New array with added elements
 */
export const pushArray = <T>(arr: T[], ...elements: T[]): T[] => {
  return [...arr, ...elements];
};

/**
 * Removes the last element from an array and returns a new array
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @returns {T[]} - New array without the last element
 */
export const popArray = <T>(arr: T[]): T[] => {
  return arr.slice(0, -1);
};

/**
 * Removes the first element from an array and returns a new array
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @returns {T[]} - New array without the first element
 */
export const shiftArray = <T>(arr: T[]): T[] => {
  return arr.slice(1);
};

/**
 * Adds one or more elements to the beginning of an array and returns a new array
 * @template T - Type of elements in the array
 * @param {T[]} arr - Input array
 * @param {T[]} elements - Elements to add
 * @returns {T[]} - New array with added elements
 */
export const unshiftArray = <T>(arr: T[], ...elements: T[]): T[] => {
  return [...elements, ...arr];
};
