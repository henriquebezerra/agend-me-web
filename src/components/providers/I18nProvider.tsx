'use client';

import { ReactNode } from 'react';
import '@/localization'; // Inicializa o i18next no cliente

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
