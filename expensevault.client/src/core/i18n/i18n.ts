import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languageDetector';

import {
  categoryEn,
  categoryGroupEn,
  commonEn,
  emailEn,
  LanguageEn,
  profileEn,
  serverResultEn,
  signInEn,
  signUpEn,
  tableEn,
  validationEn,
} from './en';
import {
  categoryGroupVi,
  categoryVi,
  commonVi,
  emailVi,
  languageVi,
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
        categoryGroup: categoryGroupEn,
        table: tableEn,
        language: LanguageEn,
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
        categoryGroup: categoryGroupVi,
        table: tableVi,
        language: languageVi,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: SETTING_ENV.isDevelopment,
  });

export default i18n;
