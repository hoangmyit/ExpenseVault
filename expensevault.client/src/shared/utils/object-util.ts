import { keys, lensProp, pipe, reduce, set } from 'ramda';

import { throwTypeError } from './common-util';

export const updatePartialObject = <T extends object>(
  target: T,
  source: Partial<T>,
): T => {
  if (
    typeof target !== 'object' ||
    target === null ||
    typeof source !== 'object' ||
    source === null
  ) {
    throwTypeError('Both target and source must be non-null objects');
  }
  return pipe(
    (obj: Partial<T>) => keys(obj).map(String),
    reduce((acc: T, key: string) => {
      const typedKey = key as keyof T;
      const xLens = lensProp<T>(typedKey);
      return set(xLens, source[typedKey] as T[typeof typedKey], acc);
    }, target),
  )(source) as T;
};

export const updateDirectPartialObject = <T extends object>(
  target: T,
  source: Partial<T>,
): T => {
  if (
    typeof target !== 'object' ||
    target === null ||
    typeof source !== 'object' ||
    source === null
  ) {
    throwTypeError('Both target and source must be non-null objects');
  }
  return Object.assign(target, source) as T;
};
