import i18n from 'i18next';

export const getLangText = (key: string, ...args: string[]) => {
  const text = i18n.t(key, { ns: 'common', lng: i18n.language, args });
  return text === key ? '' : text;
};
