'use client';

import { useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/constants';

// ============================================================
// useTheme — Dark/light mode toggle with system preference
// ============================================================

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEYS.THEME, 'system');
  const mediaQueryRef = useRef<MediaQueryList | null>(null);

  const applyTheme = (t: Theme) => {
    const isDark =
      t === 'dark' ||
      (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
  };

  useEffect(() => {
    applyTheme(theme);

    if (theme === 'system') {
      mediaQueryRef.current = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme('system');
      mediaQueryRef.current.addEventListener('change', handler);
      return () => mediaQueryRef.current?.removeEventListener('change', handler);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  return { theme, setTheme, toggleTheme };
}
