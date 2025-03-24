import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languageDetector';

import commonEn from './en/common.json';
import signInEn from './en/sign-in.json';
import validationEn from './en/validation.json';
import commonVi from './vi/common.json';
import signInVi from './vi/sign-in.json';
import validationVi from './vi/validation.json';

import { SETTING_ENV } from '@/configs/environment';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEn,
        validation: validationEn,
        signIn: signInEn,
      },
      vi: {
        common: commonVi,
        validation: validationVi,
        signIn: signInVi,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: SETTING_ENV.isDevelopment,
  });

export default i18n;
