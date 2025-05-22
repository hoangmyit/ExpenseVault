import { initReactI18next } from 'react-i18next';

import { table } from 'console';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languageDetector';

import {
  categoryEn,
  commonEn,
  emailEn,
  profileEn,
  serverResultEn,
  signInEn,
  signUpEn,
  tableEn,
  validationEn,
} from './en';
import {
  categoryVi,
  commonVi,
  emailVi,
  profileVi,
  serverResultVi,
  signInVi,
  signUpVi,
  tableVi,
  validationVi,
} from './vi';

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
        profile: profileEn,
        serverResult: serverResultEn,
        category: categoryEn,
        table: tableEn,
      },
      vi: {
        common: commonVi,
        validation: validationVi,
        signIn: signInVi,
        signUp: signUpVi,
        email: emailVi,
        profile: profileVi,
        serverResult: serverResultVi,
        category: categoryVi,
        table: tableVi,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: SETTING_ENV.isDevelopment,
  });

export default i18n;
