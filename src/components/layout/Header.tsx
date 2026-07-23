'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Home, Menu, LogOut } from 'lucide-react';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import authService from '@/services/auth.service';
import { Dialog } from '@/components/ui';
import { Drawer } from './Drawer';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout(user?.token ?? '', user?.refreshToken ?? '');
    } finally {
      logout();
      router.push('/login');
    }
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-30 flex h-16 w-full items-center justify-between px-4 sm:px-6',
          'bg-gradient-to-r from-[#268596] to-[#3a9bae]',
          'shadow-md',
          className,
        )}
      >
        <div className="flex items-center gap-1">
          {/* Hamburger */}
          <IconButton
            icon={<Menu className="h-5 w-5" />}
            className="rounded-lg bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
            onClick={() => setDrawerOpen(true)}
          />

          <div className="h-5 w-px bg-white/20" />

          {/* Home */}
          <IconButton
            icon={<Home className="h-5 w-5" />}
            tooltip={t('layout.navDashboard')}
            tooltipSide="right"
            className="rounded-lg bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
            onClick={() => router.push(ROUTES.DASHBOARD)}
          />
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="md"
          leftIcon={<LogOut className="h-5 w-5" />}
          onClick={() => setLogoutDialogOpen(true)}
          aria-label={t('layout.logout')}
          className="px-3 text-white/80 hover:bg-white/10 hover:text-white dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <span className="hidden sm:inline">{t('layout.logout')}</span>
        </Button>
      </header>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        title={t('layout.logoutDialogTitle')}
        description={t('layout.logoutDialogDesc')}
        confirmLabel={t('layout.logoutDialogConfirm')}
        cancelLabel={t('layout.logoutDialogCancel')}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
}
