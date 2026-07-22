'use client';

import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/components/ui/IconButton';

interface FooterDrawerProps {
  onClose: () => void;
}

export function FooterDrawer({ onClose }: FooterDrawerProps) {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    onClose();
  };

  return (
    <div className="px-3 py-20">
      <div className="mb-4 border-t border-white/20" />
      <IconButton
        icon={<SunMoon className="h-5 w-5" />}
        tooltip={t('layout.toggleTheme')}
        tooltipSide="right"
        className="rounded-lg bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
        containerClassName="w-fit"
        onClick={toggleTheme}
      />
    </div>
  );
}
