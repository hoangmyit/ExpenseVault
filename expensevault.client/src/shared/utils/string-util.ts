import {
  __,
  curry,
  join as joinR,
  pipe,
  repeat,
  replace,
  split,
  test,
  toLower,
  toUpper,
  trim,
} from 'ramda';

import { isNullOrEmpty } from './type-utils';

/**
 * Capitalizes the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str: string): string => {
  if (isNullOrEmpty(str)) return str;
  return toUpperCase(str.charAt(0)) + str.slice(1);
};

/**
 * Converts a string to camelCase
 * @param {string} str - String to convert
 * @returns {string} - camelCase string
 */
export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? toLowerCase(word) : toUpperCase(word);
    })
    .replace(/\s+|[-_]/g, '');
};

/**
 * Converts a string to snake_case
 * @param {string} str - String to convert
 * @returns {string} - snake_case string
 */
export const toSnakeCase = (str: string): string => {
  return pipe(
    replace(/\s+/g, '_'),
    replace(/([a-z])([A-Z])/g, '$1_$2'),
    toLowerCase,
  )(str);
};

/**
 * Converts a string to kebab-case
 * @param {string} str - String to convert
 * @returns {string} - kebab-case string
 */
export const toKebabCase = (str: string): string => {
  return pipe(
    replace(/\s+/g, '-'),
    replace(/([a-z])([A-Z])/g, '$1-$2'),
    toLowerCase,
  )(str);
};

/**
 * Converts a string to PascalCase
 * @param {string} str - String to convert
 * @returns {string} - PascalCase string
 */
export const toPascalCase = (str: string): string => {
  return pipe(
    replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => toUpperCase(word)),
    replace(/\s+|[-_]/g, ''),
  )(str);
};

/**
 * Truncates a string to specified length with optional suffix
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} [suffix='...'] - Suffix to add when truncated
 * @returns {string} - Truncated string
 */
export const truncate = curry(
  (maxLength: number, suffix: string, str: string): string => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - suffix.length) + suffix;
  },
)(__, '...');

/**
 * Removes all whitespace from a string
 * @param {string} str - String to process
 * @returns {string} - String without whitespace
 */
export const removeWhitespace = (str: string): string => {
  return replace(/\s+/g, '', str);
};

/**
 * Extracts numeric characters from a string
 * @param {string} str - String to extract from
 * @returns {string} - String containing only numbers
 */
export const extractNumbers = (str: string): string => {
  return replace(/[^0-9]/g, '', str);
};

/**
 * Converts a string to a number if possible, returns null otherwise
 * @param {string} str - String to convert
 * @returns {number | null} - Resulting number or null
 */
export const toNumber = (str: string): number | null => {
  const num = Number(str);
  return isNaN(num) ? null : num;
};

/**
 * Formats a string with template values
 * @param {string} template - Template string with {placeholders}
 * @param {Record<string, string | number>} values - Values to insert
 * @returns {string} - Formatted string
 */
export const format = curry(
  (template: string, values: Record<string, string | number>): string => {
    return replace(
      /{(\w+)}/g,
      (match, key) => {
        return values[key] !== undefined ? String(values[key]) : match;
      },
      template,
    );
  },
);

/**
 * Escapes special characters in a string for use in a regular expression
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
export const escapeRegExp = (str: string): string => {
  return replace(/[.*+?^${}()|[\]\\]/g, '\\$&', str);
};

/**
 * Checks if a string contains another string (case sensitive)
 * @param {string} str - String to check
 * @param {string} search - String to search for
 * @returns {boolean} - True if string contains search
 */
export const contains = curry((search: string, str: string): boolean => {
  return test(new RegExp(escapeRegExp(search)), str);
});

/**
 * Checks if a string contains another string (case insensitive)
 * @param {string} str - String to check
 * @param {string} search - String to search for
 * @returns {boolean} - True if string contains search (ignoring case)
 */
export const containsIgnoreCase = curry(
  (search: string, str: string): boolean => {
    return test(new RegExp(escapeRegExp(search), 'i'), str);
  },
);

/**
 * Counts occurrences of a substring in a string
 * @param {string} str - String to check
 * @param {string} search - Substring to count
 * @returns {number} - Number of occurrences
 */
export const countOccurrences = curry((search: string, str: string): number => {
  const matches = str.match(new RegExp(escapeRegExp(search), 'g'));
  return matches ? matches.length : 0;
});

/**
 * Reverses a string
 * @param {string} str - String to reverse
 * @returns {string} - Reversed string
 */
export const reverse = (str: string): string => {
  return pipe(split(''), (arr: string[]) => arr.reverse(), joinR(''))(str);
};

/**
 * Replaces all occurrences of a search string with a replacement
 * @param {string} search - String to search for
 * @param {string} replacement - Replacement string
 * @param {string} str - Input string
 * @returns {string} - String with replacements
 */
export const replaceAll = curry(
  (search: string, replacement: string, str: string): string => {
    return replace(new RegExp(escapeRegExp(search), 'g'), replacement, str);
  },
);

/**
 * Converts a string to Title Case
 * @param {string} str - String to convert
 * @returns {string} - Title Case string
 */
export const toTitleCase = (str: string): string => {
  return replace(
    /\b\w+/g,
    (word) => {
      return toUpperCase(word.charAt(0)) + toLowerCase(word.slice(1));
    },
    str,
  );
};

/**
 * Pads a string to a certain length with the specified character
 * @param {number} targetLength - Length to pad to
 * @param {string} padChar - Character to pad with
 * @param {boolean} padEnd - Whether to pad at the end or beginning
 * @param {string} str - String to pad
 * @returns {string} - Padded string
 */
export const pad = (
  targetLength: number,
  padChar: string,
  padEnd: boolean,
  str: string,
): string => {
  if (str.length >= targetLength) return str;
  const padding = repeat(padChar, targetLength - str.length);
  return padEnd ? str + padding : padding + str;
};

/**
 * Pads the start of a string
 * @param {string} str - String to pad
 * @param {number} targetLength - Length to pad to
 * @param {string} [padChar=' '] - Character to pad with
 * @returns {string} - Padded string
 */
export const padStart = curry(
  (targetLength: number, padChar: string, str: string): string => {
    return pad(targetLength, padChar, false, str);
  },
)(__, ' ');

/**
 * Pads the end of a string
 * @param {number} targetLength - Length to pad to
 * @param {string} padChar - Character to pad with
 * @param {string} str - String to pad
 * @returns {string} - Padded string
 */
export const padEnd = curry(
  (targetLength: number, padChar: string, str: string): string => {
    return pad(targetLength, padChar, true, str);
  },
)(__, ' ');

/**
 * Splits a string into lines
 * @param {string} str - String to split
 * @returns {string[]} - Array of lines
 */
export const splitLines = (str: string): string[] => {
  return split(/\r?\n/, str);
};

/**
 * Joins strings with a delimiter
 * @param {string} delimiter - Delimiter to use
 * @param {string[]} strings - Strings to join
 * @returns {string} - Joined string
 */
export const join = curry((delimiter: string, strings: string[]): string => {
  return joinR(delimiter, strings);
})(', ');

/**
 * Generates a random string of specified length
 * @param {number} length - Length of the string
 * @param {string} charset - Characters to use
 * @returns {string} - Random string
 */
export const randomString = curry((length: number, charset: string): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
})(__, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');

/**
 * Checks if a string is valid JSON
 * @param {string} str - String to check
 * @returns {boolean} - True if string is valid JSON
 */
export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Strips HTML tags from a string
 * @param {string} str - String with HTML
 * @returns {string} - String without HTML tags
 */
export const stripHtml = (str: string): string => {
  return replace(/<[^>]*>/g, '', str);
};

/**
 * Converts a string to lower case
 * @param {string} str - String to convert
 * @returns {string} - Lowercase string
 */
export const toLowerCase = toLower;

/**
 * Converts a string to upper case
 * @param {string} str - String to convert
 * @returns {string} - Uppercase string
 */
export const toUpperCase = toUpper;

/**
 * Trims whitespace from both ends of a string
 * @param {string} str - String to trim
 * @returns {string} - Trimmed string
 */
export const trimString = trim;

/**
 * Splits a string by a delimiter
 * @param {string} str - String to split
 * @param {string | RegExp} delimiter - Delimiter to split by
 * @returns {string[]} - Array of substrings
 */
export const splitString = curry(
  (str: string, delimiter: string | RegExp): string[] => {
    return split(delimiter, str);
  },
);

export const formatString = curry(
  (template: string, values: Record<string, string | number>): string => {
    return replace(
      /{(\w+)}/g,
      (match, key) => {
        return values[key] !== undefined ? String(values[key]) : match;
      },
      template,
    );
  },
);
