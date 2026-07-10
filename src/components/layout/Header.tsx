import Link from 'next/link';
import { APP_NAME } from '@/constants';
import { cn } from '@/lib/utils';

// ============================================================
// Header Component — top navigation bar
// ============================================================

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Agendamentos', href: '/dashboard/appointments' },
  { label: 'Clientes', href: '/dashboard/clients' },
  { label: 'Configurações', href: '/dashboard/settings' },
];

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full',
        'border-b border-slate-200 bg-white/80 backdrop-blur-md',
        'dark:border-slate-700 dark:bg-slate-900/80',
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xl font-bold text-violet-600 dark:text-violet-400"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white text-sm font-bold">
            A
          </span>
          {APP_NAME}
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
