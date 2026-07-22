'use client';

import { useEffect } from 'react';
import { X, Calendar, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { FooterDrawer } from '@/components/layout/FooterDrawer';
import { APP_NAME, ROUTES } from '@/constants';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export function Drawer({ open, onClose }: DrawerProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col',
          'bg-gradient-to-b from-[#268596] to-[#1f6377]',
          'shadow-2xl transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-white" strokeWidth={1.5} />
            <span className="text-lg font-bold text-white tracking-wide">
              {APP_NAME}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label={t('layout.closeMenu')}
            className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-white/20" />

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href={ROUTES.PROFILE}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <UserCircle2 className="h-5 w-5 flex-shrink-0" />
                Perfil
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <FooterDrawer onClose={onClose} />
      </aside>
    </>
  );
}
