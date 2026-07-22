'use client';

import { ReactNode } from 'react';
import '@/localization';
import i18next from '@/localization';

interface I18nProviderProps {
  children: ReactNode;
  language: string;
}

export default function I18nProvider({ children, language }: I18nProviderProps) {
  if (i18next.language !== language) {
    i18next.changeLanguage(language);
  }

  return <>{children}</>;
}
