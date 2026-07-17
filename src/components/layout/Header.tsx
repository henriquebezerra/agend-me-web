'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { Drawer } from './Drawer';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
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
        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Abrir menu"
          className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          aria-label="Sair"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </header>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
