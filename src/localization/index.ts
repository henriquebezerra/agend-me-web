'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './languages/en.json';
import ptBR from './languages/pt-BR.json';

const resources = {
  'en-US': {
    translation: en,
  },
  'pt-BR': {
    translation: ptBR,
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false, // React já faz o escape
    },
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
      lookupCookie: '@agend-me-web:language',
    }
  });

// Expõe globalmente para facilitar os testes via Console no DevTools
if (typeof window !== 'undefined') {
  (window as any).i18next = i18next;
}

export default i18next;
