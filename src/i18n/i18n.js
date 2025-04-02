// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './locales/pt/translation.json';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';

const resources = {
  pt: { translation: pt },
  en: { translation: en },
  es: { translation: es }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // idioma padrão
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
