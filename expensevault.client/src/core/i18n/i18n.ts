import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languageDetector';

import { commonEn, emailEn, signInEn, signUpEn, validationEn } from './en';
import { commonVi, emailVi, signInVi, signUpVi, validationVi } from './vi';

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
        signUp: signUpEn,
        email: emailEn,
      },
      vi: {
        common: commonVi,
        validation: validationVi,
        signIn: signInVi,
        signUp: signUpVi,
        email: emailVi,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: SETTING_ENV.isDevelopment,
  });

export default i18n;
