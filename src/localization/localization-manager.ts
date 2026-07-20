'use client';

import i18next from './index';

class LocalizationManager {
  private static instance: LocalizationManager;
  
  private constructor() {}

  static getInstance(): LocalizationManager {
    if (!LocalizationManager.instance) {
      LocalizationManager.instance = new LocalizationManager();
    }
    return LocalizationManager.instance;
  }

  updateLanguage(languageTag: string): void {
    i18next.changeLanguage(languageTag);
  }

  get languageTag(): string {
    return i18next.language || 'pt-BR';
  }
}

export const localization = LocalizationManager.getInstance();
