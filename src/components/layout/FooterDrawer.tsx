'use client';

import { SunMoon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/components/ui/IconButton';

export function FooterDrawer() {
  const { t } = useTranslation();

  return (
    <div className="px-3 py-20">
      <div className="mb-4 border-t border-white/20" />
      <IconButton
        icon={<SunMoon className="h-5 w-5" />}
        tooltip={t('layout.toggleTheme')}
        tooltipSide="right"
        className="rounded-lg bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
        containerClassName="w-fit"
      />
    </div>
  );
}
