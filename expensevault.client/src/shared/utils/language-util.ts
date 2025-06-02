import i18n from 'i18next';

import { I18nLanguageKey } from '../constants/variable.const';
import {
  SupportLanguageField,
  SupportLanguages,
  SupportLanguageType,
} from '../types/common';

import { reduceArray } from './array-util';
import { getLocalStorageItem } from './common-util';
import { defaultIfNil } from './type-utils';

export const getLangText = (key: string, ...args: string[]) => {
  const text = i18n.t(key, { ns: 'common', lng: i18n.language, args });
  return text === key ? '' : text;
};

export const getLangFieldText = (
  field: SupportLanguageField,
  language: SupportLanguageType = getLangSetting(),
): string => defaultIfNil(field?.[language], '');

export const getLangSetting = (): SupportLanguageType => {
  const lang = getLocalStorageItem(I18nLanguageKey);
  const normalizedLang = lang ? lang.split('-')[0] : null;
  return defaultIfNil(normalizedLang, 'en') as SupportLanguageType;
};

export const initSupportLanguageField = (): SupportLanguageField => {
  return reduceArray(
    [...SupportLanguages],
    (acc, lang) => {
      acc[lang] = '';
      return acc;
    },
    {} as SupportLanguageField,
  );
};
